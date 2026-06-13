import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, subject, message } = body;

        // Form Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: 'Vui lòng điền đầy đủ các thông tin bắt buộc (Họ tên, Email, Lời nhắn).' },
                { status: 400 }
            );
        }

        const resendApiKey = process.env.RESEND_API_KEY;
        const web3formsAccessKey = process.env.WEB3FORMS_ACCESS_KEY;
        const recipientEmail = 'hpthien1307@gmail.com';

        // 1. Logging the message in the server console (useful for local development)
        console.log(`[Contact Form Received]`, {
            name,
            email,
            phone: phone || 'N/A',
            subject: subject || 'N/A',
            message
        });

        // 2. Determine provider and send email
        if (resendApiKey) {
            // Send email via Resend API
            const resendResponse = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${resendApiKey}`
                },
                body: JSON.stringify({
                    from: 'Portfolio Contact <onboarding@resend.dev>', // Resend standard free sending address
                    to: recipientEmail,
                    reply_to: email,
                    subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] Tin nhắn mới từ ${name}`,
                    html: `
                        <h3>Bạn có tin nhắn liên hệ mới từ Portfolio</h3>
                        <p><strong>Họ tên:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Số điện thoại:</strong> ${phone || 'Không cung cấp'}</p>
                        <p><strong>Tiêu đề:</strong> ${subject || 'Không cung cấp'}</p>
                        <br />
                        <p><strong>Nội dung lời nhắn:</strong></p>
                        <div style="padding: 15px; background: #0f172a; color: #f8fafc; border-left: 4px solid #2282ff; border-radius: 4px; font-family: sans-serif; white-space: pre-wrap; line-height: 1.6;">${message}</div>
                    `
                })
            });

            const resendData = await resendResponse.json();

            if (!resendResponse.ok) {
                throw new Error(resendData.message || 'Lỗi khi gửi email qua Resend');
            }

            return NextResponse.json({
                success: true,
                message: 'Tin nhắn đã được gửi thành công qua Resend!'
            });
        } 
        
        if (web3formsAccessKey) {
            // Send email via Web3Forms API
            const web3Response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: web3formsAccessKey,
                    name: name,
                    email: email,
                    phone: phone || 'Không cung cấp',
                    subject: subject ? `[Portfolio] ${subject}` : `Tin nhắn liên hệ mới từ ${name}`,
                    message: message,
                    to: recipientEmail
                })
            });

            const contentType = web3Response.headers.get('content-type');
            let web3Data;

            if (contentType && contentType.includes('application/json')) {
                web3Data = await web3Response.json();
            } else {
                const errorText = await web3Response.text();
                console.error('[Web3Forms Error Response]', errorText);
                throw new Error('Web3Forms trả về kết quả không hợp lệ. Điều này xảy ra do mã Access Key trong file .env.local chưa đúng hoặc chứa ký tự đặc biệt.');
            }

            if (!web3Response.ok || !web3Data.success) {
                throw new Error(web3Data.message || 'Lỗi khi gửi email qua Web3Forms');
            }

            return NextResponse.json({
                success: true,
                message: 'Tin nhắn đã được gửi thành công qua Web3Forms!'
            });
        }

        // 3. Fallback for Local Development (no keys configured)
        console.warn('[Contact Form Warning] Chưa cấu hình RESEND_API_KEY hoặc WEB3FORMS_ACCESS_KEY. Tin nhắn chỉ hiển thị trong console này.');
        
        return NextResponse.json({
            success: true,
            message: 'Gửi thành công! (Chế độ phát triển: đã ghi nhận tin nhắn ở console server).'
        });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Đã xảy ra lỗi hệ thống khi gửi tin nhắn.';
        console.error('[Contact API Error]', error);
        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 500 }
        );
    }
}
