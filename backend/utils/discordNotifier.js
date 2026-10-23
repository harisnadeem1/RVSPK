
const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

export const sendDiscordNotification = async ({
  type,
  name,
  email,
  details,
  phone,
}) => {
  if (!discordWebhookUrl) {
    console.error("Discord webhook URL is not configured.");
    return;
  }

  try {
    const response = await fetch(discordWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "RVSPK Website Alerts",
        embeds: [
          {
            title: `New ${type} Received`,
            color: 0x79ad14,
            fields: [
              {
                name: "Customer",
                value: String(name || "Not provided").slice(0, 200),
                inline: true,
              },
              {
                name: "Email",
                value: String(email || "Not provided").slice(0, 200),
                inline: true,
              },
              {
name: "Phone",
value: String(phone || "Not provided").slice(0, 200),
inline: true,
},
              {
                name: "Details",
                value: String(details || "No additional details").slice(
                  0,
                  1000
                ),
              },
            ],
            footer: {
              text: "Right Vision Securities (Pvt.) Limited",
            },
            timestamp: new Date().toISOString(),
          },
        ],
        allowed_mentions: {
          parse: [],
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Discord returned ${response.status}: ${errorText}`
      );
    }

    console.log(`Discord notification sent: ${type}`);
  } catch (error) {
    // Notification failures must not interrupt customer submissions.
    console.error("Discord notification failed:", error.message);
  }
};
