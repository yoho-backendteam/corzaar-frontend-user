
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../Constants/uiconstants";
import { Mail, Phone, MapPin } from "lucide-react";
import logocap from "../../assets/images/logocap.png";


const Footer = () => {

  const navigate = useNavigate();
  return (
    <footer className="mt-0">

      <section className="text-center text-white py-20 px-6 md:px-12 lg:px-20 relative overflow-hidden" style={{ background: COLORS.primary_red }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-base md:text-lg mb-8">
            Join thousands of Students already learning on CORZAAR
          </p>
          <button className="bg-white font-semibold cursor-pointer px-6 py-3 rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-2 mx-auto" style={{ color: COLORS.primary_red }}
            onClick={() => navigate("/courses")} >
            Explore All Courses →
          </button>
        </div>


        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>
      </section>

      <div className="bg-white text-black py-12 px-6 md:px-12 lg:px-20 border-t">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div className="text-left">
            <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: COLORS.primary_red }}>
              <img src={logocap} alt="Logo" className="w-8 h-8" />
              CORZAAR
            </h2>
            <p className=" text-sm mt-3" style={{ color: COLORS.primary_gray }}>
              India's leading educational marketplace connecting students with
              the world's best institutes and courses.
            </p>
          </div>


          <div className="text-left">
            <h3 className="text-xl font-bold mb-3">Platform</h3>
            <ul className="space-y-2 " style={{ color: COLORS.primary_gray }}>
              <li>Home</li>
              <li>Courses</li>
              <li>Institutes</li>
              <li>About Us</li>
            </ul>
          </div>


          <div className="text-left">
            <h3 className="text-xl font-bold mb-3">Support</h3>
            <ul className="space-y-2 " style={{ color: COLORS.primary_gray }}>
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Report Issue</li>
            </ul>
          </div>


          <div className="text-left">
            <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
            <p className=" text-sm mb-4" style={{ color: COLORS.primary_gray }}>
              India's leading educational marketplace connecting students with
              the world's best institutes and courses.
            </p>
            <div className="grid flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your Email"
                className="border border-gray-400 rounded-md px-3 py-2 text-sm w-full"
              />
              <button
                className="text-white cursor-pointer px-4 py-2 rounded-md transition"
                style={{ background: COLORS.primary_red }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#b31218")}
                onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.primary_red)}
              >
                Subscribe
              </button>

            </div>
          </div>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12 text-center md:text-left">

          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-start">

              <div
                className="p-3 rounded-lg inline-block items-center justify-center"
                style={{ background: COLORS.primary_yellow }}
              >
                <Mail className="w-5 h-5" style={{ color: COLORS.primary_white }} />
              </div>


              <div className="ml-3">
                <p className="font-bold text-lg">Email</p>
                <p className="text-sm md:text-base" style={{ color: COLORS.primary_gray }}>
                  support@edumarket.com
                </p>
              </div>
            </div>
          </div>


          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-start">

              <div
                className="p-3 rounded-lg inline-block  items-center justify-center"
                style={{ background: COLORS.primary_yellow }}
              >
                <Phone className="w-5 h-5 " style={{ color: COLORS.primary_white }} />
              </div>

              {/* Text */}
              <div className="ml-3">
                <p className="font-bold text-lg">Phone</p>
                <p className="text-sm md:text-base" style={{ color: COLORS.primary_gray }}>
                  +91 9876565784
                </p>
              </div>
            </div>
          </div>


          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-start">

              <div
                className="p-3 rounded-lg inline-block items-center justify-center"
                style={{ background: COLORS.primary_yellow }}
              >
                <MapPin className="w-5 h-5 " style={{ color: COLORS.primary_white }} />
              </div>


              <div className="ml-3">
                <p className="font-bold text-lg">Address</p>
                <p className="text-sm md:text-base" style={{ color: COLORS.primary_gray }}>
                  123 Education Street, Boston, MA
                </p>
              </div>
            </div>
          </div>
        </div>


        <div className="mt-10  pt-6 flex flex-col sm:flex-row justify-between text-sm " style={{ color: COLORS.primary_gray }}>
          <p>© 2025 EduMarket. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 mt-2 sm:mt-0">
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