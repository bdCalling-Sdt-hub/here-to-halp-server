const ticketTemp = (data) =>
  ` 
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f2f3f8;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 40px auto;
                  background-color: #ffffff;
                  padding: 40px;
                  border-radius: 10px;
                  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
                }
                .nardo-logo {
                  text-align: center
                }
                .logo {
                  max-width: 100%;
                  margin-bottom: 20px;
                }
                h1 {
                  color: #1a73e8;
                  font-size: 26px;
                  margin-bottom: 20px;
                  font-weight: bold;
                  text-align: center;
                }
                p {
                  color: #555555;
                  line-height: 1.8;
                  font-size: 16px;
                  margin-bottom: 20px;
                }
                table {
                  width: fit-content;
                  border-collapse: collapse;
                  margin: 20px 0;
                }
                table th, table td {
                  padding: 12px;
                  text-align: left;
                  border: 1px solid #ddd;
                }
                table th {
                  white-space: nowrap;
                  background-color: #f2f3f8;
                  font-weight: bold;
                }
                .footer {
                  margin-top: 30px;
                  font-size: 13px;
                  color: #9e9e9e;
                  text-align: center;
                }
                .footer p {
                  margin: 5px 0;
                }
                a {
                  color: #1a73e8;
                  text-decoration: none;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="nardo-logo">
                  <img src="https://res.cloudinary.com/dsmqrbppz/image/upload/v1738837909/heretohalp_vpnfm3.png" alt="Heretohalp Logo" class="logo" />
                </div>
                <h1>Ticket Confirmation</h1>
                <p>Hello,</p>
                <p>Thank you for submitting ticket with <strong>BETS</strong>. Here is your Ticket details:</p>
                
                <table>
                  <tr>
                    <th>Ticket ID</th>
                    <td>${data.uniqueId}</td>
                  </tr>              
                  <tr>
                    <th>Company Name</th>
                    <td>${data.companyName}</td>
                  </tr>
                  <tr>
                    <th>email</th>
                    <td>${data.email}</td>
                  </tr>
                  <tr>
                    <th>Service Name</th>
                    <td>${data.service}</td>
                  </tr>
                  <tr>
                    <th>Summary</th>
                    <td>${data.summary}</td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>${data.description}</td>
                  </tr>
                  <tr>
                    <th>Document Link</th>
                    <td>${data.document}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>${data.status}</td>
                  </tr>
                </table>
  
              <div>
                <p>We will soon contact you.</p>              
              </div>              
  
                <p>We look forward to serving you. If you have any questions, feel free to contact us at <a href="mailto:thakursaad@gmail.com">thakursaad@gmail.com</a>.</p>
                <p>Best regards,<br>The BETS Team</p>
              </div>
              <div class="footer">
                <p>&copy; BETS - All Rights Reserved.</p>
                <p><a href="https://yourwebsite.com/privacy">Privacy Policy</a> | <a href="https://yourwebsite.com/contact">Contact Support</a></p>
              </div>
            </body>
          </html>
        `;

module.exports = ticketTemp;
