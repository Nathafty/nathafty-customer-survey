'use client';

import { useState } from 'react';

interface SurveyFormProps {
  onSubmit: (data: any) => void;
}

export default function SurveyForm({ onSubmit }: SurveyFormProps) {
  const [formData, setFormData] = useState<any>({
    name: '',
    phone: '',
    whatsapp: '',
    trashFrequency: '',
    bagsPerWeek: '',
    bagType: '',
    mainConcern: '',
    paysService: '',
    monthlyPayment: '',
  });

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.phone.trim()) newErrors.phone = 'Le numéro de téléphone est requis';
    if (!formData.trashFrequency) newErrors.trashFrequency = 'Veuillez sélectionner une fréquence';
    if (!formData.bagsPerWeek.trim()) newErrors.bagsPerWeek = 'Veuillez indiquer le nombre de sacs';
    if (!formData.bagType) newErrors.bagType = 'Veuillez sélectionner le type de sacs';
    if (!formData.mainConcern.trim()) newErrors.mainConcern = 'Veuillez décrire votre principale préoccupation';
    if (!formData.paysService) newErrors.paysService = 'Veuillez répondre à cette question';
    if (formData.paysService === 'Oui' && !formData.monthlyPayment.trim()) {
      newErrors.monthlyPayment = 'Veuillez indiquer le montant mensuel';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSubmitError(null);
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const response = await fetch('/api/surveys', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || result.error || 'Erreur lors de la soumission');
        }

        console.log('✅ Enquête soumise avec succès:', result);
        onSubmit(formData);

      } catch (error: any) {
        console.error('❌ Erreur lors de la soumission:', error);
        setSubmitError(
          error.message || 
          'Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.'
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 sm:space-y-6">
      {/* Informations personnelles */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold text-primary border-b-2 border-primary pb-2">
          Vos informations
        </h3>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nom complet *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input-field ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Votre nom"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Téléphone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
            placeholder="Ex: +222 12 34 56 78"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
            WhatsApp (optionnel)
          </label>
          <input
            type="tel"
            id="whatsapp"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            className={`input-field ${errors.whatsapp ? 'border-red-500' : ''}`}
            placeholder="Ex: +222 12 34 56 78"
          />
          {errors.whatsapp && <p className="mt-1 text-sm text-red-600">{errors.whatsapp}</p>}
        </div>
      </div>

      {/* Questions sur la gestion des déchets */}
      <div className="space-y-4 sm:space-y-6">
        <h3 className="text-lg sm:text-xl font-semibold text-primary border-b-2 border-primary pb-2">
          Questionnaire sur la gestion des déchets
        </h3>

        {/* Question 1 - Fréquence de sortie des poubelles */}
        <div>
          <label htmlFor="trashFrequency" className="block text-sm font-medium text-gray-700 mb-1">
            1️⃣ - Quelle fréquence sortez-vous vos poubelles ? *
          </label>
          <select
            id="trashFrequency"
            name="trashFrequency"
            value={formData.trashFrequency}
            onChange={handleChange}
            className={`input-field ${errors.trashFrequency ? 'border-red-500' : ''}`}
          >
            <option value="">Sélectionnez une option</option>
            <option value="Tous les jours">Tous les jours</option>
            <option value="2-3 fois par semaine">2-3 fois par semaine</option>
            <option value="1 fois par semaine">1 fois par semaine</option>
            <option value="Moins d'une fois par semaine">Moins d&apos;une fois par semaine</option>
          </select>
          {errors.trashFrequency && <p className="mt-1 text-sm text-red-600">{errors.trashFrequency}</p>}
        </div>

        {/* Question 2 - Nombre de sacs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            2️⃣ - En moyenne, combien de sacs/barils de déchets produisez-vous par semaine ? *
          </label>
          <div className="space-y-3">
            <div>
              <label htmlFor="bagsPerWeek" className="block text-xs text-gray-600 mb-1">
                Nombre de sacs/barils
              </label>
              <input
                type="number"
                id="bagsPerWeek"
                name="bagsPerWeek"
                min="0"
                value={formData.bagsPerWeek}
                onChange={handleChange}
                className={`input-field ${errors.bagsPerWeek ? 'border-red-500' : ''}`}
                placeholder="Ex: 3"
              />
              {errors.bagsPerWeek && <p className="mt-1 text-sm text-red-600">{errors.bagsPerWeek}</p>}
            </div>
            <div>
              <label htmlFor="bagType" className="block text-xs text-gray-600 mb-1">
                Type de contenants
              </label>
              <select
                id="bagType"
                name="bagType"
                value={formData.bagType}
                onChange={handleChange}
                className={`input-field ${errors.bagType ? 'border-red-500' : ''}`}
              >
                <option value="">Sélectionnez le type</option>
                <option value="Petits sacs">Petits sacs</option>
                <option value="Moyens sacs">Moyens sacs</option>
                <option value="Grands sacs">Grands sacs</option>
                <option value="Barile">Barile (baril)</option>
                <option value="Mixte">Mixte</option>
              </select>
              {errors.bagType && <p className="mt-1 text-sm text-red-600">{errors.bagType}</p>}
            </div>
          </div>
        </div>

        {/* Question 3 - Principale préoccupation */}
        <div>
          <label htmlFor="mainConcern" className="block text-sm font-medium text-gray-700 mb-1">
            3️⃣ - Qu&apos;est-ce qui vous dérange le plus dans la gestion actuelle de vos déchets ? *
          </label>
          <textarea
            id="mainConcern"
            name="mainConcern"
            required={false}
            value={formData.mainConcern}
            onChange={handleChange}
            rows={4}
            className={`input-field resize-none ${errors.mainConcern ? 'border-red-500' : ''}`}
            placeholder="Décrivez votre principale préoccupation..."
          />
          {errors.mainConcern && <p className="mt-1 text-sm text-red-600">{errors.mainConcern}</p>}
        </div>

        {/* Question 4 - Paiement service */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            4️⃣ - Payez-vous actuellement un service lié à la collecte des déchets ? *
          </label>
          <div className="flex gap-4 mb-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="paysService"
                value="Oui"
                checked={formData.paysService === 'Oui'}
                onChange={handleChange}
                className="mr-2 w-4 h-4 text-primary focus:ring-primary"
              />
              <span className="text-gray-700">Oui</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="paysService"
                value="Non"
                checked={formData.paysService === 'Non'}
                onChange={handleChange}
                className="mr-2 w-4 h-4 text-primary focus:ring-primary"
              />
              <span className="text-gray-700">Non</span>
            </label>
          </div>
          {errors.paysService && <p className="mt-1 text-sm text-red-600">{errors.paysService}</p>}
          
          {/* Champ conditionnel - Montant mensuel */}
          {formData.paysService === 'Oui' && (
            <div className="mt-3 pl-6 border-l-4 border-secondary">
              <label htmlFor="monthlyPayment" className="block text-sm font-medium text-gray-700 mb-1">
                Combien environ par collecte ? *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  id="monthlyPayment"
                  name="monthlyPayment"
                  value={formData.monthlyPayment}
                  onChange={handleChange}
                  className={`input-field ${errors.monthlyPayment ? 'border-red-500' : ''}`}
                  placeholder="Ex: 5000 MRU"
                />
              </div>
              {errors.monthlyPayment && <p className="mt-1 text-sm text-red-600">{errors.monthlyPayment}</p>}
            </div>
          )}
        </div>
      </div>

      {/* Message d'erreur global */}
      {submitError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="text-red-500 text-xl">⚠️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">Erreur de soumission</p>
              <p className="mt-1 text-sm text-red-700">{submitError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Bouton de soumission */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn-primary w-full sm:w-auto sm:px-12 text-base sm:text-lg ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Envoi en cours...
            </span>
          ) : (
            'Soumettre l\'enquête'
          )}
        </button>
      </div>
    </form>
  );
}
