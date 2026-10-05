"use client";
import { useEffect, useMemo, useState } from "react";
import {
  flattenContactInfo,
  getContactValue,
  parseContactValues,
  phoneHref,
  whatsappHref,
  mailHref,
} from "./contact-utils";
import {
  DEFAULT_ADDRESS,
  DEFAULT_PHONE,
  DEFAULT_EMAIL,
} from "./constants";

export function useContactInfo() {
  const [contactInfo, setContactInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/site-data?pageType=contact")
      .then((r) => r.json())
      .then((json) => {
        if (isMounted && json?.data?.contactInfo) {
          setContactInfo(json.data.contactInfo);
        }
      })
      .catch((err) => console.warn("Contact info fetch error:", err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const phoneValue =
    getContactValue(contactInfo, ["Phone", "Phone Number", "Mobile", "Mobile Number", "Contact"]) ||
    DEFAULT_PHONE;
  const emailValue =
    getContactValue(contactInfo, ["Email", "Email Address", "Mail"]) ||
    DEFAULT_EMAIL;
  const addressValue =
    getContactValue(contactInfo, ["Address", "Office Address", "Location"]) ||
    DEFAULT_ADDRESS;

  const parsedPhones = useMemo(() => parseContactValues(phoneValue), [phoneValue]);
  const parsedEmails = useMemo(() => parseContactValues(emailValue), [emailValue]);

  const phones = parsedPhones.length > 0 ? parsedPhones : [DEFAULT_PHONE];
  const emails = parsedEmails.length > 0 ? parsedEmails : [DEFAULT_EMAIL];

  return {
    contactInfo: flattenContactInfo(contactInfo),
    phones,
    emails,
    address: addressValue,
    primaryPhone: phones[0] || DEFAULT_PHONE,
    primaryPhoneHref: phoneHref(phones[0] || DEFAULT_PHONE),
    primaryWhatsAppHref: whatsappHref(phones[0] || DEFAULT_PHONE),
    primaryEmail: emails[0] || DEFAULT_EMAIL,
    primaryEmailHref: mailHref(emails[0] || DEFAULT_EMAIL),
    loading,
  };
}

