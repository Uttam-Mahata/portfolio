import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Linkedin, 
  Github, 
  Facebook,
  Twitter,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Contact = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
        const response = await fetch('https://contact-form-v2ph.onrender.com/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      
          const result = await response.json();

        if (response.ok) {
          setStatus({
            type: 'success',
            message: result.message
          });
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
            setStatus({
                type: 'error',
                message: result.error || 'Failed to send message'
            });
          }
        
      } catch (error) {
          setStatus({
            type: 'error',
            message: 'There was an error sending your message. Please try again.'
          });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: 'uttam-mahata-cs@outlook.com',
      link: 'mailto:uttam-mahata-cs@outlook.com'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      value: '+91 9679244057',
      link: 'tel:+919679244057'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      value: 'Howrah, India',
      link: 'https://maps.app.goo.gl/r7WcftPiGACcgZQN8'
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="w-6 h-6" />,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/uttam-mahata-4b0364259/'
    },
    {
      icon: <Github className="w-6 h-6" />,
      name: 'GitHub',
      url: 'https://github.com/Uttam-Mahata'
    },
    {
      icon: <Facebook className="w-6 h-6" />,
      name: 'Facebook',
      url: 'https://www.facebook.com/dummy.uttam.0.0.0.0/'
    }
  ];

  return (
    <section id="contact" className="relative py-20 bg-white dark:bg-dark-bg transition-colors duration-300">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: theme === 'light' 
            ? 'radial-gradient(circle at 25px 25px, black 1px, transparent 0)'
            : 'radial-gradient(circle at 25px 25px, white 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="section-title dark:text-dark-text">Get In Touch</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Have a question or want to work together? Feel free to contact me!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8 animate-slide-up">
            <div className="bg-gray-50 dark:bg-dark-card rounded-lg p-8 space-y-8 hover:shadow-lg transition-all duration-300">
              {/* Contact Details */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-dark-bg rounded-lg shadow-sm flex items-center justify-center text-primary-600 dark:text-primary-400">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text">{info.title}</h3>
                      <p>{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">Connect With Me</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white dark:bg-dark-bg rounded-lg shadow-sm flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover:-translate-y-1 hover:shadow-lg"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

          
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 dark:bg-dark-card rounded-lg p-8 hover:shadow-lg transition-all duration-300 animate-slide-up delay-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:text-dark-text"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:text-dark-text"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:text-dark-text"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:text-dark-text"
                />
              </div>

              {status.message && (
                <div className={`flex items-center space-x-2 text-sm ${
                  status.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {status.type === 'success' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;