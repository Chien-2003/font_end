'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Breadcrumbs from '@/components/views/Breadcrumbs';
import { motion } from 'framer-motion';
import { Fragment, useState } from 'react';
import {
  FaCheckCircle,
  FaClock,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhoneAlt,
  FaTiktok,
  FaYoutube,
} from 'react-icons/fa';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-2xl text-primary" />,
      title: 'Địa chỉ cửa hàng',
      content: '172 Nguyễn Trãi, P.Bến Thành, Quận 1, TP.HCM',
      subtitle: 'Công ty TNHH N.D.C',
    },
    {
      icon: <FaPhoneAlt className="text-2xl text-primary" />,
      title: 'Số điện thoại',
      content: '0834 265 606 - 0834 265 707',
      subtitle: 'Miễn phí cuộc gọi',
    },
    {
      icon: <FaEnvelope className="text-2xl text-primary" />,
      title: 'Email hỗ trợ',
      content: 'cskh@elysiawear.com',
      subtitle: 'Phản hồi trong 24h',
    },
    {
      icon: <FaClock className="text-2xl text-primary" />,
      title: 'Giờ làm việc',
      content: '8:00 - 20:00 (Thứ 2 - Thứ 7)',
      subtitle: 'Kể cả ngày lễ',
    },
  ];

  const socialLinks = [
    {
      icon: <FaFacebook />,
      href: '#',
      label: 'Facebook',
      color: 'hover:text-blue-600',
    },
    {
      icon: <FaInstagram />,
      href: '#',
      label: 'Instagram',
      color: 'hover:text-pink-600',
    },
    {
      icon: <FaTiktok />,
      href: '#',
      label: 'TikTok',
      color: 'hover:text-gray',
    },
    {
      icon: <FaYoutube />,
      href: '#',
      label: 'YouTube',
      color: 'hover:text-red-600',
    },
  ];

  return (
    <Fragment>
      <div className="mx-auto max-w-full md:px-14 xl:px-15 2xl:px-16 px-4 sm:px-6 lg:px-15 w-full h-full py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="mb-6">
            <Breadcrumbs />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên
            hệ với Elysia Wear để được tư vấn về sản phẩm hoặc giải
            đáp mọi thắc mắc.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-background rounded-2xl p-6 border border-border hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-foreground/90 font-medium mb-1">
                  {item.content}
                </p>
                <p className="text-sm text-foreground/80">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-background rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Gửi yêu cầu đến với chúng tôi
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Cảm ơn bạn!
                  </h3>
                  <p className="text-foreground/70">
                    Tin nhắn của bạn đã được gửi thành công. Chúng tôi
                    sẽ phản hồi sớm nhất có thể.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="block text-sm font-medium text-foreground mb-2">
                        Họ và tên *
                      </Label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 transition-all duration-300 h-12"
                        placeholder="Nhập họ và tên của bạn"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-foreground mb-2">
                        Số điện thoại
                      </Label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 transition-all duration-300 h-12"
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 transition-all duration-300 h-12"
                      placeholder="Nhập địa chỉ email"
                    />
                  </div>

                  <div>
                    <Label className="block text-sm font-medium text-foreground mb-2">
                      Chủ đề *
                    </Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value: string) =>
                        setFormData((prev) => ({
                          ...prev,
                          subject: value,
                        }))
                      }
                      required
                    >
                      <SelectTrigger className="w-full h-12 transition-all duration-300">
                        <SelectValue placeholder="Chọn chủ đề" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product-inquiry">
                          Tư vấn sản phẩm
                        </SelectItem>
                        <SelectItem value="order-support">
                          Hỗ trợ đơn hàng
                        </SelectItem>
                        <SelectItem value="return-exchange">
                          Đổi trả hàng
                        </SelectItem>
                        <SelectItem value="complaint">
                          Khiếu nại
                        </SelectItem>
                        <SelectItem value="partnership">
                          Hợp tác kinh doanh
                        </SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="block text-sm font-medium text-foreground mb-2">
                      Tin nhắn *
                    </Label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl transition-all duration-300 min-h-45"
                      placeholder="Nhập nội dung tin nhắn..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-primary hover:bg-primary/90 hover:shadow-md'
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="text-sm" />
                        Gửi tin nhắn
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-background rounded-2xl overflow-hidden border border-border">
              <div className="h-80 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <div className="text-center">
                  <FaMapMarkerAlt className="text-4xl text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">
                    Vị trí cửa hàng
                  </h3>
                  <p className="text-sm text-foreground/70">
                    172 Nguyễn Trãi, P.Bến Thành, Q1, HCM
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-2xl p-8 border border-border">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Kết nối với chúng tôi
              </h3>
              <p className="text-foreground/90 mb-6">
                Theo dõi Elysia Wear trên các kênh mạng xã hội để cập
                nhật những xu hướng thời trang mới nhất.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`p-3 bg-secondary/10 rounded-xl text-foreground/70 ${social.color} transition-all duration-300 hover:shadow-lg`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-xl font-bold text-foreground mb-3">
                Câu hỏi thường gặp
              </h3>
              <p className="text-foreground/90 mb-4">
                Tìm hiểu câu trả lời cho những thắc mắc phổ biến về
                sản phẩm và dịch vụ của chúng tôi.
              </p>
              <motion.a
                href="/hoi-dap-faq"
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-2 bg-primary text-background px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-all duration-300"
              >
                Xem FAQ
                <FaPaperPlane className="text-sm" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </Fragment>
  );
}
