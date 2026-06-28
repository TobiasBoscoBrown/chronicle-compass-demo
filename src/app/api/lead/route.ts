import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { name, phone, source } = await request.json();
    if (!phone || typeof phone !== 'string') {
      return NextResponse.json({ error: 'Phone is required' }, { status: 400 });
    }

    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.LEAD_TO || 'tobiasboscob@gmail.com';
    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = Number(process.env.SMTP_PORT || 465);

    // If email isn't configured yet, accept the lead so the demo still works.
    if (!user || !pass) {
      console.log('LEAD (email not configured):', { name, phone, source });
      return NextResponse.json({ ok: true, delivered: false });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: process.env.LEAD_FROM || `Chronicle & Compass <${user}>`,
      to,
      replyTo: user,
      subject: `New callback request${name ? ' from ' + name : ''}`,
      text: `New lead from the Chronicle & Compass site.\n\nName: ${name || '(not given)'}\nPhone: ${phone}\nSource: ${source || 'callback'}\nTime: ${new Date().toISOString()}`,
    });

    return NextResponse.json({ ok: true, delivered: true });
  } catch (e: any) {
    console.error('lead error', e);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
