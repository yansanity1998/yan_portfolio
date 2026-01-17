
import React, { useRef, useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_2bpmlyb';
const TEMPLATE_ID = 'template_xgo94ol';
const PUBLIC_KEY = 'KAVoUJLwVgNH5dsUV';

const Contact: React.FC = () => {
	const form = useRef<HTMLFormElement>(null);
	const [status, setStatus] = useState<string>('');
	const [sending, setSending] = useState<boolean>(false);

	const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!form.current) return;
		setSending(true);
		setStatus('Sending...');
		try {
			await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY);
			setStatus('Message sent successfully!');
			form.current.reset();
		} catch (error) {
			setStatus('Failed to send message. Please try again.');
			// Log error details for debugging
			if (typeof error === 'object' && error !== null) {
				// @ts-ignore
				console.error('EmailJS error:', (error as any).text || (error as any).message || error);
			} else {
				console.error('EmailJS error:', error);
			}
		} finally {
			setSending(false);
		}
	};

	return (
		<div className="w-full">
			<form
				ref={form}
				onSubmit={sendEmail}
				className="w-full space-y-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/70 p-6 text-zinc-100 shadow-xl shadow-rose-500/10 backdrop-blur-sm sm:p-8"
				aria-label="Contact form"
			>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div className="space-y-2">
						<label htmlFor="name" className="text-sm font-medium text-zinc-200">
							Your Name
						</label>
						<input
							id="name"
							type="text"
							name="name"
							required
							className="w-full rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-rose-500/70 focus:ring-2 focus:ring-rose-500/60"
							placeholder="Your name"
							autoComplete="name"
						/>
					</div>
					<div className="space-y-2">
						<label htmlFor="email" className="text-sm font-medium text-zinc-200">
							Your Email
						</label>
						<input
							id="email"
							type="email"
							name="email"
							required
							className="w-full rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-rose-500/70 focus:ring-2 focus:ring-rose-500/60"
							placeholder="your@email.com"
							autoComplete="email"
						/>
					</div>
				</div>
				<div className="space-y-2">
					<label htmlFor="message" className="text-sm font-medium text-zinc-200">
						Your Message
					</label>
					<textarea
						id="message"
						name="message"
						required
						className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-rose-500/70 focus:ring-2 focus:ring-rose-500/60"
						placeholder="Tell me a bit about your project, timeline, and goals."
						rows={5}
					></textarea>
				</div>
				<button
					type="submit"
					className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-red-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/25 transition hover:scale-[1.01] hover:shadow-rose-500/40 disabled:cursor-not-allowed disabled:opacity-60"
					disabled={sending}
				>
					{sending ? 'Sending…' : 'Send Message'}
				</button>
				{status && (
					<p className="pt-1 text-center text-xs text-zinc-400">
						{status}
					</p>
				)}
			</form>
		</div>
	);
};

export default Contact;
