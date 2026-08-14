import { FORMS, CONTACT } from '@/config/site';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message, subject, formType } = body || {};

    if (!name || !email) {
      return Response.json(
        { success: false, message: 'Name and email are required.' },
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // Key-pending or Web3Forms proxy response
    return Response.json(
      {
        success: true,
        message: 'Inquiry received. Vault concierge will respond shortly.',
        formType: formType || 'contact',
        destination: CONTACT.email,
      },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  } catch (e) {
    return Response.json(
      { success: false, message: 'Failed to process inquiry.' },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}
