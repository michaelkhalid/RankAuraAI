import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, HelpCircle } from 'lucide-react';
import { PAKISTAN_CITIES } from '../data/keywords';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: 'Lahore',
    subject: 'General Inquiry',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate real database write submission
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        city: 'Lahore',
        subject: 'General Inquiry',
        message: ''
      });
      // reset success box after 5s
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 transition-colors min-h-screen py-16 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Get in touch with the SEO Experts
          </h1>
          <p className="mt-4 text-base text-slate-500 max-w-xl mx-auto">
            Have questions about integrating premium batch APIs or requesting a custom city database? Drop us a prompt.
          </p>
        </div>

        {/* Outer details grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Col 1: Contacts details lists (covers 5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 bg-slate-50 dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800 rounded-2xl">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Official Headquarters
              </h2>
              
              <ul className="space-y-6 text-sm text-slate-600 dark:text-zinc-300">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-800 dark:text-zinc-100">Lahore Head office</span>
                    <span>Level 4, Alfalah Building, Mall Road, Lahore, HP 54000, Pakistan</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-800 dark:text-zinc-100">Karachi branch office</span>
                    <span>Block 5, Clifton Tower, Kehkashan Sector 5, Clifton Karachi, SN 75600, Pakistan</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-purple-600 shrink-0" />
                  <span>+92 (42) 3578-1920 / +92 (21) 3219-0931</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-600 shrink-0" />
                  <span>helo@rankaura.ai / sales@rankaura.pk</span>
                </li>
              </ul>
            </div>

            {/* Support guarantee info */}
            <div className="p-4 rounded-xl bg-purple-50/55 dark:bg-purple-950/20 border border-purple-200/40 dark:border-purple-900/50 flex gap-3 text-xs text-purple-950 dark:text-purple-300">
              <HelpCircle className="w-5 h-5 shrink-0 mt-0.5 text-purple-600" />
              <div>
                <span className="font-bold block">24-Hour Callback Service:</span> Our customer relations managers based in Lahore and Karachi review every incoming ticket and respond within one state working day.
              </div>
            </div>
          </div>

          {/* Col 2: Live feedback submission form (covers 7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Send us a direct ticket
            </h2>

            {success && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 text-sm text-emerald-800 dark:text-emerald-300 flex items-center gap-2 animate-fade-in">
                <CheckCircle className="w-5 h-5 shrink-0 text-emerald-500" />
                <span>Ticket logged successfully! Our team will send an email message to your address shortly.</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-5">
              
              {/* Name field */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="user-name" className="block text-xs font-bold uppercase text-slate-500 dark:text-zinc-400">
                    Your Name
                  </label>
                  <input
                    id="user-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Michael Khalid"
                    className="w-full px-4 py-2 text-sm border border-slate-200 dark:border-zinc-800 bg-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white"
                  />
                </div>

                {/* Email address field */}
                <div className="space-y-1.5">
                  <label htmlFor="user-email" className="block text-xs font-bold uppercase text-slate-500 dark:text-zinc-400">
                    Email Address
                  </label>
                  <input
                    id="user-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. you@domain.pk"
                    className="w-full px-4 py-2 text-sm border border-slate-200 dark:border-zinc-800 bg-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* City & Subject rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* City dropdown */}
                <div className="space-y-1.5">
                  <label htmlFor="user-city" className="block text-xs font-bold uppercase text-slate-500 dark:text-zinc-400">
                    Your Pakistan City
                  </label>
                  <select
                    id="user-city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-sm border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-950 dark:text-white"
                  >
                    {PAKISTAN_CITIES.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Subject dropdown */}
                <div className="space-y-1.5">
                  <label htmlFor="user-subject" className="block text-xs font-bold uppercase text-slate-500 dark:text-zinc-400">
                    Subject Topic
                  </label>
                  <select
                    id="user-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-sm border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-950 dark:text-white"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Enterprise API">Premium API Access Request</option>
                    <option value="Custom Database">Custom City Database addition</option>
                    <option value="Bug Report">Technical Bug Report</option>
                  </select>
                </div>
              </div>

              {/* Message content textarea */}
              <div className="space-y-1.5">
                <label htmlFor="user-message" className="block text-xs font-bold uppercase text-slate-500 dark:text-zinc-400">
                  Detailed Message
                </label>
                <textarea
                  id="user-message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="How can our Pakistan SEO analyst team assist you today?"
                  className="w-full px-4 py-2 text-sm border border-slate-200 dark:border-zinc-800 bg-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white"
                />
              </div>

              {/* Submit CTA */}
              <button
                id="contact-form-submit-btn"
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition cursor-pointer flex items-center justify-center space-x-2 shadow disabled:opacity-55"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Logging Ticket...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message Ticket</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
