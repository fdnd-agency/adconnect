import { Resend } from "resend";
import { RESEND_API_KEY } from "$env/static/private";
import { fail } from "@sveltejs/kit";

// Connecting the API KEY to the variable resend
const resend = new Resend(RESEND_API_KEY);

// API link with contact data is retrieved
const contactAPI = "https://fdnd-agency.directus.app/items/adconnect_contact";

// Email validation regex
let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Form submitting
export const actions = {
  // The default function that is going to run
  default: async ({ request }) => {
    // 'request' contains all the form field data

    // Retrieves the form field data from the 'request'
    const formData = await request.formData();

    // Variables to get the form fields
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    console.log("Check data submitted", { name, email, message });

    // Check if there is an correct email
    if (!regex.test(email)) {
      return fail(400, { error: "Ongeldig e-mailadres." });
    }

    try {
      // Send the email using Resend
      await resend.emails.send({
        from: "Overlegplatform Ad <onboarding@resend.dev>",
        to: "amschalker@gmail.com",
        subject: "Nieuwe inzending contactformulier",
        text: `Naam: ${name}\nEmail: ${email}\nBericht: ${message}`,
      });

      // Retrieve data in API Directus
      const directusResponse = await fetch(contactAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      return { success: true };

      // If something goes wrong tell the form it failed
    } catch (error) {
      console.error("Resend error:", error);
      return fail(500, { error: "Het verzenden is mislukt." });
    }
  },
};
