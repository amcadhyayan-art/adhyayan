import React, { useState } from 'react';
import { X, Sparkles, User, Mail, Phone, Book, Hash, ShieldCheck, BedDouble, UtensilsCrossed, Clock } from 'lucide-react';
import { API_BASE_URL } from '../config';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedType: 'workshop' | 'competition' | 'accommodation';
  preSelectedItem: any;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  preSelectedType,
  preSelectedItem
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [days, setDays] = useState(1);
  const [checkIn, setCheckIn] = useState('');
  const [accommodationRequired, setAccommodationRequired] = useState(false);
  const [foodRequired, setFoodRequired] = useState(false);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number>(-1);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      // Validate slot selection for workshops with multiple slots
      const workshopSlots = preSelectedType === 'workshop' ? (preSelectedItem.slots || []) : [];
      if (preSelectedType === 'workshop' && workshopSlots.length > 1 && selectedSlotIndex < 0) {
        setErrorMessage('Please select a time slot to continue.');
        setLoading(false);
        return;
      }

      // Build items selected structure
      const itemsSelected = {
        workshops: preSelectedType === 'workshop' ? [preSelectedItem._id || preSelectedItem.id] : [],
        competitions: preSelectedType === 'competition' ? [preSelectedItem._id || preSelectedItem.id] : [],
        accommodation: preSelectedType === 'accommodation' ? {
          option: preSelectedItem._id || preSelectedItem.id,
          days: days,
          checkIn: checkIn
        } : undefined
      };

      const userDetails = { fullName, email, phone, college, rollNo };

      // 1. Initiate Payment Order on backend
      const initiateRes = await fetch(`${API_BASE_URL}/api/payment/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userDetails,
          itemsSelected,
          selectedSlotIndex: selectedSlotIndex >= 0 ? selectedSlotIndex : (workshopSlots.length === 1 ? 0 : -1),
          foodRequired: foodRequired ? 'yes' : 'no',
          accommodationRequired: accommodationRequired ? 'yes' : 'no'
        })
      });

      if (!initiateRes.ok) {
        const errorData = await initiateRes.json();
        throw new Error(errorData.message || 'Payment initiation failed.');
      }

      const orderData = await initiateRes.json();

      // 2. Open Razorpay Checkout popup
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ADHYAYAN 2026',
        description: `Registration for ${preSelectedItem.title || preSelectedItem.type}`,
        order_id: orderData.orderId,
        prefill: {
          name: fullName,
          email: email,
          contact: phone
        },
        theme: {
          color: '#0ea5e9' // sky-500
        },
        handler: async function (response: any) {
          setLoading(true);
          try {
            // 3. Verify signature on backend
            const verifyRes = await fetch(`${API_BASE_URL}/api/payment/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                registrationId: orderData.registrationId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            if (!verifyRes.ok) {
              throw new Error('Payment verification failed.');
            }

            setSuccess(true);
            alert("Registration and Payment Successful! A confirmation receipt has been sent to your email.");
          } catch (verifyErr: any) {
            setErrorMessage(verifyErr.message || 'Signature verification failed.');
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
      <div className="relative w-full max-w-lg overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute right-6 top-6 p-2 rounded-full bg-slate-950/40 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="h-4 w-4" />
        </button>

        {success ? (
          <div className="text-center py-10 space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
              <ShieldCheck className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold font-outfit text-white">Registration Successful!</h3>
            <p className="text-slate-400 font-jakarta text-sm leading-relaxed max-w-xs mx-auto">
              Your payment is verified. A receipt slip has been dispatched to your email address: <strong className="text-slate-200">{email}</strong>.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold uppercase tracking-wider border border-sky-500/20 mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                Fest Registration
              </span>
              <h2 className="text-2xl font-bold font-outfit">
                Register for {preSelectedItem.title || preSelectedItem.type}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter your details to initiate transaction payment.
              </p>
            </div>

            {errorMessage && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-slate-950 border border-slate-800 pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full bg-slate-950 border border-slate-800 pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-500" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full bg-slate-950 border border-slate-800 pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                  />
                </div>

                <div className="relative">
                  <Book className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="College Name"
                    className="w-full bg-slate-950 border border-slate-800 pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                  />
                </div>

                <div className="relative">
                  <Hash className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder="Roll Number / ID"
                    className="w-full bg-slate-950 border border-slate-800 pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-sky-500/50"
                  />
                </div>

                {/* Slot Picker — shown only for workshops that have multiple slots */}
                {preSelectedType === 'workshop' && preSelectedItem.slots && preSelectedItem.slots.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> Select Your Time Slot
                    </p>
                    <div className="space-y-2">
                      {preSelectedItem.slots.map((slot: any, idx: number) => {
                        const label  = typeof slot === 'string' ? slot.split(' | ')[0] : slot.label;
                        const filled = typeof slot === 'object' ? (slot.slotsFilled ?? 0) : 0;
                        const total  = typeof slot === 'object' ? (slot.slotsTotal ?? 50) : 50;
                        const isFull = filled >= total;
                        const isSelected = selectedSlotIndex === idx;
                        return (
                          <button
                            key={idx}
                            type="button"
                            disabled={isFull}
                            onClick={() => setSelectedSlotIndex(idx)}
                            className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                              isFull
                                ? 'opacity-40 cursor-not-allowed bg-slate-950 border-slate-800'
                                : isSelected
                                ? 'bg-sky-500/15 border-sky-500/60 ring-1 ring-sky-500/40'
                                : 'bg-slate-950 border-slate-800 hover:border-slate-600'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                                isSelected ? 'border-sky-500 bg-sky-500' : 'border-slate-600'
                              }`}>
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                              <span className={`text-sm font-medium ${
                                isSelected ? 'text-sky-300' : isFull ? 'text-slate-600' : 'text-slate-200'
                              }`}>{label}</span>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isFull
                                ? 'bg-red-500/10 text-red-400'
                                : filled / total > 0.8
                                ? 'bg-orange-500/10 text-orange-400'
                                : 'bg-emerald-500/10 text-emerald-400'
                            }`}>
                              {isFull ? 'FULL' : `${total - filled} left`}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Additional Accommodation Controls */}
                {preSelectedType === 'accommodation' && (
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1 font-semibold">CHECK-IN DATE</label>
                      <input
                        type="date"
                        required
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-sky-500/50 text-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1 font-semibold">NO. OF DAYS</label>
                      <input
                        type="number"
                        required
                        min={1}
                        value={days}
                        onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                        className="w-full bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-sky-500/50 text-white"
                      />
                    </div>
                  </div>
                )}

                {/* Accommodation & Food Preference Toggles */}
                <div className="pt-2 space-y-3">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Additional Requirements</p>

                  {/* Accommodation Toggle */}
                  <label
                    htmlFor="accommodation-toggle"
                    className={`flex items-center justify-between gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      accommodationRequired
                        ? 'bg-sky-500/10 border-sky-500/40'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        accommodationRequired ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-800 text-slate-500'
                      }`}>
                        <BedDouble className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Accommodation Required</p>
                        <p className="text-xs text-slate-500">I need a place to stay during the fest</p>
                      </div>
                    </div>
                    <div className="relative flex-shrink-0">
                      <input
                        id="accommodation-toggle"
                        type="checkbox"
                        checked={accommodationRequired}
                        onChange={(e) => setAccommodationRequired(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-11 h-6 rounded-full transition-colors ${
                        accommodationRequired ? 'bg-sky-500' : 'bg-slate-700'
                      }`}>
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          accommodationRequired ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </div>
                    </div>
                  </label>

                  {/* Food Toggle */}
                  <label
                    htmlFor="food-toggle"
                    className={`flex items-center justify-between gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      foodRequired
                        ? 'bg-emerald-500/10 border-emerald-500/40'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        foodRequired ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                      }`}>
                        <UtensilsCrossed className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Food Required</p>
                        <p className="text-xs text-slate-500">I need meals during the fest</p>
                      </div>
                    </div>
                    <div className="relative flex-shrink-0">
                      <input
                        id="food-toggle"
                        type="checkbox"
                        checked={foodRequired}
                        onChange={(e) => setFoodRequired(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-11 h-6 rounded-full transition-colors ${
                        foodRequired ? 'bg-emerald-500' : 'bg-slate-700'
                      }`}>
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          foodRequired ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Cost summary */}
              <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-2xl flex justify-between items-center text-sm mt-6">
                <span className="text-slate-400 font-semibold">Payable Total</span>
                <span className="text-xl font-bold text-sky-400">
                  ₹{preSelectedType === 'accommodation' ? preSelectedItem.pricePerDay * days : preSelectedItem.price}
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-black font-extrabold rounded-xl transition-all shadow-lg shadow-sky-500/10 flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black"></div>
                ) : (
                  'Pay & Register'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;
