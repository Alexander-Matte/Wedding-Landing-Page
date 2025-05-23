export default defineEventHandler(async (event) => {
  try {
    const { message, name, email } = await readBody(event);

    const data = await $fetch(process.env.NUXT_SUPABASE_EMAIL_EDGE_URL as string, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
      body: {
        from: 'Automated Email <weddingAlert@resend.dev>',
        to: process.env.EMAIL_TO,
        subject: "Someone RSVP'd to your wedding!",
        message,
        name,
        email,
      }
    });

    return { success: true, data };

  } catch (error: any) {
    console.error('Error sending email:', error);

    throw createError({
      statusCode: 500,
      statusMessage: error.data?.message || error.message || 'Unexpected error'
    });
  }
});
