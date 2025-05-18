export default defineEventHandler(async (event) => {
  try {
    // Read JSON body from the request
    const { to, from, subject, message } = await readBody(event);
    
    // Call your Supabase Edge Function
    const response = await fetch('https://hmnxqljqivelblnqcytu.supabase.co/functions/v1/send-email', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        from,
        subject,
        message,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        statusCode: 500,
        body: { error: error.message || 'Failed to send email' }
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: { success: true, data }
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: { error: error.message || 'Unexpected error' }
    };
  }
});
