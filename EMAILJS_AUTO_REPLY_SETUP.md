# How to Enable Automatic "Thank You" Emails

Great job! Your contact form is working. To send an automatic "Thank You" email to your visitors, you need to enable the **Auto-Reply** feature in your EmailJS dashboard.

This is a **setting**, not a code change. Follow these simple steps:

### Step 1: Open EmailJS Dashboard
1. Go to [https://dashboard.emailjs.com](https://dashboard.emailjs.com) and log in.
2. Click on **"Email Templates"** in the left sidebar.
3. Click on the Template you are using (the one you created earlier).

### Step 2: Configure Auto-Reply
1. Inside the template editor, look for the **"Auto-Reply"** tab at the top (next to "Content" and "Settings").
2. Click the **"Enable Auto-Reply"** checkbox.

### Step 3: Set "To Email" (Crucial!)
1. In the **"To Email"** field of the Auto-Reply settings, enter exactly this:
   ```
   {{user_email}}
   ```
   *(This tells EmailJS to send the email to the address the user typed in your form).*

### Step 4: Customize the Message
1. **Subject:** Enter something like: `Thanks for contacting Siddharth!`
2. **Content:** Write your thank you message. You can use their name too:
   ```
   Hi {{user_name}},

   Thanks for reaching out! I've received your message and will get back to you shortly.

   Best,
   Siddharth Arekar
   ```
3. **Save** the template.

---

### Tests
1. Go back to your website.
2. Send a message using a **different email address** (like a spare Gmail or Yahoo).
3. Check that inbox—you should receive the "Thank You" mail instantly!
