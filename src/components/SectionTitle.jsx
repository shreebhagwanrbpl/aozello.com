export default function SectionTitle({
  badge,
  title,
  description,
  center = false,
}) {
  return (
    <div
      className={`${center ? "text-center mx-auto" : ""
        } max-w-3xl`}
    >
      {/* Badge */}
      {badge && (
        <div className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white text-sm font-semibold mb-5 shadow-lg shadow-red-300/40">
          {badge}
        </div>
      )}

      {/* Title */}
      <h2 className="section-title">
        {title}
      </h2>

      {/* Description */}
      <p className="section-subtitle">
        {description}
      </p>
    </div>
  );
}