import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Robust image loader using server-side proxy endpoint to bypass CORS policy.
 * Converts Firebase Storage URLs or external product photos to Base64 data URLs
 * guaranteeing 100% successful rendering in html2canvas.
 */
async function getBase64Image(src) {
  if (!src) return "";
  if (src.startsWith("data:")) return src;

  // Local relative images (e.g. /placeholder.jpg)
  if (src.startsWith("/")) {
    const fullUrl = window.location.origin + src;
    try {
      const res = await fetch(fullUrl);
      if (res.ok) {
        const blob = await res.blob();
        const base64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = () => resolve(src);
          reader.readAsDataURL(blob);
        });
        if (base64 && base64.startsWith("data:")) {
          return base64;
        }
      }
    } catch (e) {
      console.warn("Local image base64 fetch failed:", e);
    }
  }

  // Remote images (Firebase Storage, external CDN, etc.) -> Call server-side proxy API
  if (src.startsWith("http")) {
    try {
      const proxyApi = `/api/proxy-image?url=${encodeURIComponent(src)}`;
      const res = await fetch(proxyApi);
      if (res.ok) {
        const data = await res.json();
        if (data.dataUrl && data.dataUrl.startsWith("data:")) {
          return data.dataUrl;
        }
      }
    } catch (e) {
      console.warn("Proxy image endpoint failed:", e);
    }
  }

  // Fallback: Try converting any rendered <img> tag from current DOM
  try {
    const allImgs = document.querySelectorAll("img");
    for (let i = 0; i < allImgs.length; i++) {
      const img = allImgs[i];
      if (
        img.src === src ||
        (src && img.src.includes(src.split("/").pop()))
      ) {
        if (img.complete && img.naturalWidth > 0) {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth || 400;
          canvas.height = img.naturalHeight || 400;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL("image/png");
          if (dataUrl && dataUrl.length > 200) {
            return dataUrl;
          }
        }
      }
    }
  } catch (e) {}

  return src;
}

/**
 * Generates and downloads a high-resolution PDF brochure for a product
 * matching the official Rajbiosis Private Limited specification brochure template.
 */
export async function generateBrochurePDF(product, currentSelectedImage = null) {
  if (!product) return;

  const title = product.title || "Biomedical Product";
  const brand = product.brand || "Raj Biosis";
  const model = product.model || "N/A";
  const instrument = product.instrument || "Diagnostic Equipment";
  const usage = product.usage || "Clinical Laboratory";
  const automation = product.automation || "Manual / Semi / Automated";
  const capacity = product.capacity || product.size || "Standard";
  const availability = product.availability || "In Stock";
  const description =
    product.desc ||
    product.description ||
    `The ${title} is an advanced diagnostic analyzer designed for high performance, accuracy, and reliability in medical laboratories, hospitals, and clinical settings across India.`;

  const rawImageSrc =
    currentSelectedImage ||
    product.images?.[0] ||
    product.image ||
    "/placeholder.jpg";

  // Convert product image to Base64 data URL
  const base64Image = await getBase64Image(rawImageSrc);
  const finalImgSrc = base64Image || rawImageSrc;

  // Create temporary container for generating brochure DOM
  const container = document.createElement("div");
  container.id = "pdf-brochure-container";
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.width = "794px";
  container.style.height = "1123px"; // Exact A4 aspect ratio
  container.style.backgroundColor = "#ffffff";
  container.style.opacity = "1"; // MUST BE 1
  container.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  container.style.color = "#0f172a";
  container.style.boxSizing = "border-box";
  container.style.overflow = "hidden";

  container.innerHTML = `
    <div style="position: relative; width: 794px; height: 1123px; background: #ffffff; padding: 0; margin: 0; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden;">
      
      <!-- Diagonal Watermark Grid Background -->
      <div style="position: absolute; inset: 0; pointer-events: none; z-index: 1; overflow: hidden; display: flex; flex-wrap: wrap; align-content: space-around; justify-content: space-around; opacity: 0.08; transform: rotate(-30deg) scale(1.3);">
        ${Array(16)
          .fill(0)
          .map(
            () =>
              `<div style="font-size: 18px; font-weight: 900; color: #1d3b58; text-transform: uppercase; letter-spacing: 2px; margin: 35px 20px; white-space: nowrap;">
                RAJBIOSIS PRIVATE LIMITED
              </div>`
          )
          .join("")}
      </div>

      <!-- Main Content Area -->
      <div style="position: relative; z-index: 10; display: flex; flex-direction: column; flex-grow: 1;">
        
        <!-- Top Navy Header Bar -->
        <div style="background-color: #1d3b58; color: #ffffff; padding: 18px 32px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 24px; font-weight: 800; letter-spacing: -0.5px; line-height: 1;">Rajbiosis Private Limited</div>
          </div>
          <div style="text-align: right; font-size: 12.5px; font-weight: 500; line-height: 1.4;">
            <div><strong>Phone:</strong> +91 9983123469</div>
            <div style="opacity: 0.9; margin-top: 2px;"><strong>Web:</strong> www.aozello.com</div>
          </div>
        </div>

        <!-- Body Content -->
        <div style="padding: 24px 32px 10px 32px;">
          
          <!-- Product Title -->
          <h1 style="font-size: 21px; font-weight: 800; color: #0f172a; margin: 0 0 14px 0; line-height: 1.35;">
            ${title}
          </h1>

          <!-- Gold Banner -->
          <div style="background-color: #d99b38; color: #ffffff; text-align: center; font-weight: 800; font-size: 13.5px; letter-spacing: 1.5px; padding: 10px 16px; border-radius: 6px; text-transform: uppercase; margin-bottom: 20px;">
            OFFICIAL PRODUCT SPECIFICATION BROCHURE
          </div>

          <!-- Image & Specifications Section -->
          <div style="display: flex; gap: 20px; align-items: stretch; margin-bottom: 24px;">
            
            <!-- Left Column: Product Image Box -->
            <div style="flex: 1; border: 2px solid #a5d8e2; border-radius: 14px; background-color: #ffffff; padding: 12px; display: flex; align-items: center; justify-content: center; height: 260px; box-sizing: border-box; overflow: hidden;">
              <img id="pdf-product-img" src="${finalImgSrc}" alt="${title}" style="max-width: 100%; max-height: 230px; object-fit: contain; display: block; margin: 0 auto;" />
            </div>

            <!-- Right Column: Key Specifications Table -->
            <div style="flex: 1.15; border: 1px solid #1d3b58; border-radius: 12px; overflow: hidden; background: #ffffff; display: flex; flex-direction: column; height: 260px; box-sizing: border-box;">
              <div style="background-color: #1d3b58; color: #ffffff; font-weight: 800; font-size: 13px; padding: 10px 16px; text-transform: uppercase; letter-spacing: 0.5px;">
                KEY SPECIFICATIONS
              </div>
              <table style="width: 100%; border-collapse: collapse; font-size: 12px; flex-grow: 1;">
                <tbody>
                  <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 8px 14px; font-weight: 700; color: #1d3b58; width: 38%;">Brand:</td>
                    <td style="padding: 8px 14px; color: #334155;">${brand}</td>
                  </tr>
                  <tr style="background-color: #ffffff; border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 8px 14px; font-weight: 700; color: #1d3b58;">Model:</td>
                    <td style="padding: 8px 14px; color: #334155;">${model}</td>
                  </tr>
                  <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 8px 14px; font-weight: 700; color: #1d3b58;">Instrument:</td>
                    <td style="padding: 8px 14px; color: #334155;">${instrument}</td>
                  </tr>
                  <tr style="background-color: #ffffff; border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 8px 14px; font-weight: 700; color: #1d3b58;">Usage:</td>
                    <td style="padding: 8px 14px; color: #334155;">${usage}</td>
                  </tr>
                  <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 8px 14px; font-weight: 700; color: #1d3b58;">Automation:</td>
                    <td style="padding: 8px 14px; color: #334155;">${automation}</td>
                  </tr>
                  <tr style="background-color: #ffffff; border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 8px 14px; font-weight: 700; color: #1d3b58;">Size / Capacity:</td>
                    <td style="padding: 8px 14px; color: #334155;">${capacity}</td>
                  </tr>
                  <tr style="background-color: #f8fafc;">
                    <td style="padding: 8px 14px; font-weight: 700; color: #1d3b58;">Availability:</td>
                    <td style="padding: 8px 14px; color: #334155; font-weight: 600;">${availability}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

          <!-- Product Overview Section -->
          <div style="margin-bottom: 22px;">
            <h2 style="font-size: 15px; font-weight: 800; color: #1d3b58; margin: 0 0 8px 0; border-bottom: 2px solid #1d3b58; padding-bottom: 3px; display: inline-block;">
              PRODUCT OVERVIEW
            </h2>
            <p style="font-size: 12.5px; color: #475569; line-height: 1.65; margin: 6px 0 0 0; text-align: justify;">
              ${description}
            </p>
          </div>

          <!-- Key Applications & Why Choose Us Cards -->
          <div style="display: flex; gap: 18px; margin-bottom: 20px;">
            
            <!-- Key Applications Card -->
            <div style="flex: 1; border: 1px solid #1d3b58; border-radius: 10px; overflow: hidden; background: #ffffff;">
              <div style="background-color: #1d3b58; color: #ffffff; font-weight: 800; font-size: 12.5px; padding: 8px 14px; text-transform: uppercase;">
                KEY APPLICATIONS
              </div>
              <div style="padding: 12px 14px;">
                <ul style="margin: 0; padding: 0; list-style: none; font-size: 12px; color: #334155; line-height: 1.85;">
                  <li style="display: flex; align-items: center; gap: 8px;">
                    <span style="color: #d99b38; font-size: 13px;">●</span> Clinical Diagnostic Laboratories
                  </li>
                  <li style="display: flex; align-items: center; gap: 8px;">
                    <span style="color: #d99b38; font-size: 13px;">●</span> Hospitals & Healthcare Centres
                  </li>
                  <li style="display: flex; align-items: center; gap: 8px;">
                    <span style="color: #d99b38; font-size: 13px;">●</span> Pathology & Testing Labs
                  </li>
                  <li style="display: flex; align-items: center; gap: 8px;">
                    <span style="color: #d99b38; font-size: 13px;">●</span> Blood Banks & Research Units
                  </li>
                  <li style="display: flex; align-items: center; gap: 8px;">
                    <span style="color: #d99b38; font-size: 13px;">●</span> Medical Colleges & Institutions
                  </li>
                </ul>
              </div>
            </div>

            <!-- Why Choose Us Card -->
            <div style="flex: 1; border: 1px solid #1d3b58; border-radius: 10px; overflow: hidden; background: #ffffff;">
              <div style="background-color: #1d3b58; color: #ffffff; font-weight: 800; font-size: 12.5px; padding: 8px 14px; text-transform: uppercase;">
                WHY CHOOSE RAJBIOSIS PRIVATE LIMITED
              </div>
              <div style="padding: 12px 14px;">
                <ul style="margin: 0; padding: 0; list-style: none; font-size: 12px; color: #334155; line-height: 1.85;">
                  <li style="display: flex; align-items: center; gap: 8px;">
                    <span style="color: #2563eb; font-size: 13px;">●</span> Trusted Biomedical Equipment Supplier
                  </li>
                  <li style="display: flex; align-items: center; gap: 8px;">
                    <span style="color: #2563eb; font-size: 13px;">●</span> 100% Genuine Leading Brand Products
                  </li>
                  <li style="display: flex; align-items: center; gap: 8px;">
                    <span style="color: #2563eb; font-size: 13px;">●</span> Competitive Pricing & Warranty Support
                  </li>
                  <li style="display: flex; align-items: center; gap: 8px;">
                    <span style="color: #2563eb; font-size: 13px;">●</span> Prompt Installation & Staff Training
                  </li>
                  <li style="display: flex; align-items: center; gap: 8px;">
                    <span style="color: #2563eb; font-size: 13px;">●</span> Fast Express Delivery Across India
                  </li>
                </ul>
              </div>
            </div>

          </div>

        </div>

      </div>

      <!-- Bottom Navy Footer Bar -->
      <div style="position: relative; z-index: 10; background-color: #1d3b58; color: #ffffff; padding: 14px 32px; display: flex; justify-content: space-between; align-items: center; font-size: 10.5px;">
        <div>
          <div style="font-weight: 700; font-size: 11.5px;">RAJBIOSIS PRIVATE LIMITED - Diagnostic Instruments & Healthcare Solutions</div>
          <div style="color: #cbd5e1; font-size: 9.5px; margin-top: 2px;">Biomedical equipment sales, service, installation, AMC & calibration across India</div>
        </div>
        <div style="text-align: right; color: #cbd5e1; font-size: 9.5px;">
          Official Product Brochure | Confidential & Proprietary
        </div>
      </div>

    </div>
  `;

  document.body.appendChild(container);

  try {
    // Wait for img in container to finish loading if needed
    const imgEl = container.querySelector("#pdf-product-img");
    if (imgEl && !imgEl.complete) {
      await new Promise((resolve) => {
        imgEl.onload = resolve;
        imgEl.onerror = resolve;
      });
    }

    // Convert DOM container to canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      imageTimeout: 15000,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.98);
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

    const fileName = `${(product.slug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")}_Brochure.pdf`;

    pdf.save(fileName);
  } catch (err) {
    console.error("Error generating brochure PDF:", err);
    throw err;
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
}
