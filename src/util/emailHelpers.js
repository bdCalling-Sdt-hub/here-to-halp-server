const { default: status } = require("http-status");
const ApiError = require("../error/ApiError");
const otpResendTemp = require("../mail/otpResendTemp");
const resetPassEmailTemp = require("../mail/resetPassEmailTemp");
const signUpEmailTemp = require("../mail/signUpEmailTemp");
const { sendEmail } = require("../util/sendEmail");
const ticketTemp = require("../mail/ticketTemp");

const sendActivationEmail = async (email, data) => {
  try {
    await sendEmail({
      email,
      subject: "Activate Your Account",
      html: signUpEmailTemp(data),
    });
  } catch (error) {
    throw new ApiError(status.INTERNAL_SERVER_ERROR, "Email was not sent");
  }
};

const sendOtpResendEmail = async (email, data) => {
  try {
    await sendEmail({
      email,
      subject: "New Activation Code",
      html: otpResendTemp(data),
    });
  } catch (error) {
    throw new ApiError(status.INTERNAL_SERVER_ERROR, "Email was not sent");
  }
};

const sendResetPasswordEmail = async (email, data) => {
  try {
    await sendEmail({
      email,
      subject: "Password Reset Code",
      html: resetPassEmailTemp(data),
    });
  } catch (error) {
    throw new ApiError(status.INTERNAL_SERVER_ERROR, error.message);
  }
};

const sendTicketEmail = async (email, data) => {
  try {
    await sendEmail({
      email,
      subject: "BETS Ticket",
      html: ticketTemp(data),
    });
  } catch (error) {
    throw new ApiError(status.INTERNAL_SERVER_ERROR, error.message);
  }     
};

const EmailHelpers = {
  sendActivationEmail,
  sendOtpResendEmail,
  sendResetPasswordEmail,
  sendTicketEmail,
};

module.exports = EmailHelpers;
