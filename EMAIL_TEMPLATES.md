# Premium Borderless Dark Templates

I added the **Social Links (LinkedIn, GitHub, Portfolio)** to the bottom of the User Email. They are styled as clean, clickable text links that perfectly match the dark theme.

## 1. Auto-Reply Template (For the User)
*Updated: Now includes footer links for LinkedIn, GitHub, and Portfolio.*

```html
<!DOCTYPE html>
<html>
<head>
<style>
    /* Same Premium Dark Theme */
    body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #020617; }
    
    .wrapper { width: 100%; background-color: #020617; padding-bottom: 40px; }

    .main {
        background-color: #0f172a;
        margin: 0 auto;
        width: 100%;
        max-width: 600px;
        border-radius: 0 0 24px 24px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        overflow: hidden;
    }

    /* HEADER STYLE (Gradient Bar) */
    .header-bar {
        background: linear-gradient(90deg, #0ea5e9, #6366f1);
        padding: 30px 40px;
    }

    .title { color: white; font-size: 20px; font-weight: bold; margin: 0; }
    .subtitle { color: rgba(255,255,255,0.8); font-size: 13px; margin-top: 5px; }

    .content { padding: 40px 40px 30px 40px; }

    /* Text Styles */
    .greeting {
        color: #f8fafc;
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 20px;
    }

    .message-text {
        color: #94a3b8; /* Slate 400 */
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 30px;
    }

    /* Footer Links Section */
    .footer-links {
        border-top: 1px solid #1e293b;
        padding: 20px 10px 30px 10px; /* Reduced side padding for mobile */
        background-color: #0b1120;
        text-align: center;
        white-space: nowrap; /* Forces one line */
    }

    .social-link {
        color: #38bdf8;
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        margin: 0 6px; /* Reduced margin */
        display: inline-block;
    }
    
    .social-link:hover { text-decoration: underline; }
    
    .copyright {
        color: #475569;
        font-size: 12px;
        margin-top: 15px;
        display: block;
    }
</style>
</head>
<body>
    <div class="wrapper">
        <div class="main">
            <!-- Colorful Header -->
            <div class="header-bar">
                <div class="title">Message Received!</div>
                <div class="subtitle">Siddharth Arekar • Cloud Engineer</div>
            </div>

            <!-- Content -->
            <div class="content">
                <div class="greeting">Hi {{user_name}},</div>

                <p class="message-text">
                    Thanks for reaching out!
                    <br><br>
                    I just wanted to let you know that I've received your message. I'll read it and get back to you personally as soon as I can.
                </p>
            </div>

            <!-- New Footer Section with Links -->
            <div class="footer-links">
                <a href="https://www.linkedin.com/in/siddharth-arekar/" class="social-link">LinkedIn</a>
                <span style="color: #334155;">|</span>
                <a href="https://github.com/SiddharthArekar" class="social-link">GitHub</a>
                <span style="color: #334155;">|</span>
                <a href="https://yourwebsite.com" class="social-link">Portfolio</a>

                <span class="copyright">&copy; 2026 Siddharth Arekar</span>
            </div>
        </div>
    </div>
</body>
</html>
```

---

## 2. Notification Template (For YOU)
*Unchanged.*

```html
<!DOCTYPE html>
<html>
<head>
<style>
    /* Same Premium Dark Theme */
    body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #020617; }
    
    .wrapper { width: 100%; background-color: #020617; padding-bottom: 40px; }

    .main {
        background-color: #0f172a;
        margin: 0 auto;
        width: 100%;
        max-width: 600px;
        border-radius: 0 0 24px 24px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        overflow: hidden;
    }

    .header-bar {
        background: linear-gradient(90deg, #0ea5e9, #6366f1);
        padding: 30px 40px;
    }

    .title { color: white; font-size: 20px; font-weight: bold; margin: 0; }
    .subtitle { color: rgba(255,255,255,0.8); font-size: 13px; margin-top: 5px; }

    .content { padding: 40px; }

    /* Data Fields */
    .field-label {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        color: #64748b; /* Slate 500 */
        font-weight: 700;
        margin-bottom: 8px;
        margin-top: 24px;
    }

    .field-value {
        color: #f8fafc; /* White */
        font-size: 16px;
        font-weight: 500;
    }

    .message-box {
        background-color: #1e293b; /* Slightly lighter slate */
        color: #e2e8f0;
        padding: 20px;
        border-radius: 12px;
        line-height: 1.6;
        margin-top: 8px;
    }

    .highlight { color: #38bdf8; text-decoration: none; }
</style>
</head>
<body>
    <div class="wrapper">
        <div class="main">
            <!-- Colorful Header -->
            <div class="header-bar">
                <div class="title">New Message Received</div>
                <div class="subtitle">From your personal portfolio</div>
            </div>

            <div class="content">
                <!-- Name -->
                <div class="field-label">SENDER</div>
                <div class="field-value">{{user_name}}</div>

                <!-- Email -->
                <div class="field-label">EMAIL ADDRESS</div>
                <div class="field-value">
                    <a href="mailto:{{user_email}}" class="highlight">{{user_email}}</a>
                </div>

                <!-- Message -->
                <div class="field-label">MESSAGE</div>
                <div class="message-box">
                    {{message}}
                </div>
            </div>
        </div>
    </div>
</body>
</html>
```
