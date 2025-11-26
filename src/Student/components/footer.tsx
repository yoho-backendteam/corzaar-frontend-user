import { COLORS, FONTS } from "../../Constants/uiconstants";
import { Mail, Phone, MapPin } from "lucide-react";
import logocap from "../../assets/images/logocap.png";

const Footer = () => {
  return (
    <footer className="mt-0">
      <section
        className="text-center text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 relative overflow-hidden"
        style={{ background: COLORS.primary_red }}
      >
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4"
            style={{ ...(FONTS.regular5 as any) }}
          >
            Ready to Start Learning?
          </h2>
          <p
            className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8"
            style={{ ...(FONTS.S_Cart_subtitle2 as any) }}
          >
            Join thousands of Students already learning on CORZAAR
          </p>
          <button
            className="bg-white font-semibold rounded-[4px] px-4 sm:px-[16px] py-2 sm:py-[12px] w-full max-w-[213px] h-[44px] sm:h-[48px] flex items-center justify-center gap-2 sm:gap-[10px] mx-auto border transition"
            style={{ color: COLORS.primary_red }}
          >
            Explore All Courses →
          </button>
        </div>

        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>
      </section>

      <div className="bg-white text-black py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 border-t">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="text-left">
            <h2
              className="text-lg sm:text-xl font-bold flex items-center gap-2"
              style={{ color: COLORS.primary_red }}
            >
              <img src={logocap} alt="Logo" className="w-7 h-7 sm:w-8 sm:h-8" />
              CORZAAR
            </h2>
            <p
              className="text-xs sm:text-sm mt-2 sm:mt-3"
              style={{ color: COLORS.primary_gray }}
            >
              India's leading educational marketplace connecting students with
              the world's best institutes and courses.
            </p>
          </div>

          <div className="text-left">
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
              Platform
            </h3>
            <ul
              className="space-y-1 sm:space-y-2 text-sm sm:text-base"
              style={{ color: COLORS.primary_gray }}
            >
              <li>Home</li>
              <li>Courses</li>
              <li>Institutes</li>
              <li>About Us</li>
            </ul>
          </div>

          <div className="text-left">
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
              Support
            </h3>
            <ul
              className="space-y-1 sm:space-y-2 text-sm sm:text-base"
              style={{ color: COLORS.primary_gray }}
            >
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Report Issue</li>
            </ul>
          </div>

          <div className="text-left">
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
              Stay Updated
            </h3>
            <p
              className="text-xs sm:text-sm mb-3 sm:mb-4"
              style={{ color: COLORS.primary_gray }}
            >
              India's leading educational marketplace connecting students with
              the world's best institutes and courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your Email"
                className="border border-gray-400 rounded-md px-3 py-2 text-xs sm:text-sm w-full"
              />
              <button
                className="text-white px-4 py-2 rounded-md transition text-xs sm:text-sm"
                style={{ background: COLORS.primary_red }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#b31218")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = COLORS.primary_red)
                }
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10 md:mt-12 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="flex items-start">
              <div
                className="p-2 sm:p-3 rounded-lg inline-block items-center justify-center"
                style={{ background: COLORS.primary_yellow }}
              >
                <Mail
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  style={{ color: COLORS.primary_white }}
                />
              </div>

              <div className="ml-2 sm:ml-3">
                <p className="font-bold text-base sm:text-lg">Email</p>
                <p
                  className="text-xs sm:text-sm md:text-base"
                  style={{ color: COLORS.primary_gray }}
                >
                  support@edumarket.com
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="flex items-start">
              <div
                className="p-2 sm:p-3 rounded-lg inline-block items-center justify-center"
                style={{ background: COLORS.primary_yellow }}
              >
                <Phone
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  style={{ color: COLORS.primary_white }}
                />
              </div>

              <div className="ml-2 sm:ml-3">
                <p className="font-bold text-base sm:text-lg">Phone</p>
                <p
                  className="text-xs sm:text-sm md:text-base"
                  style={{ color: COLORS.primary_gray }}
                >
                  +91 9876565784
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="flex items-start">
              <div
                className="p-2 sm:p-3 rounded-lg inline-block items-center justify-center"
                style={{ background: COLORS.primary_yellow }}
              >
                <MapPin
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  style={{ color: COLORS.primary_white }}
                />
              </div>

              <div className="ml-2 sm:ml-3">
                <p className="font-bold text-base sm:text-lg">Address</p>
                <p
                  className="text-xs sm:text-sm md:text-base"
                  style={{ color: COLORS.primary_gray }}
                >
                  123 Education Street, Boston, MA
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-8 sm:mt-10 pt-4 sm:pt-6 flex flex-col sm:flex-row justify-between text-xs sm:text-sm"
          style={{ color: COLORS.primary_gray }}
        >
          <p>© 2025 EduMarket. All rights reserved.</p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 mt-2 sm:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookie Policy</span>
            <span>Refund Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
