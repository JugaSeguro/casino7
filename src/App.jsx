/**
 * Componente principal de la aplicación
 * Gestiona la estructura principal y los estilos globales
 */

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initFacebookPixel, trackPageView, trackEvent, trackCustomEvent } from './lib/facebookPixel';
import './styles/main.css';
import './styles/popup.css';
import { useLandingPhone } from '@shared/useLandingPhone';



function App() {
  const { phoneData, loading } = useLandingPhone();
  const location = useLocation();

  // Efectos al cargar el componente
  useEffect(() => {
    initFacebookPixel('1183845977056318', 'en_US');
  }, []);

  useEffect(() => {
    trackPageView({ path: location.pathname + location.search });
  }, [location.pathname, location.search]);

  // Efectos al cargar el componente
  useEffect(() => {
    const webComponent = document.getElementById('lux-register');
    if (!webComponent) {
      console.error('❌ Webcomponent no encontrado en el DOM');
    }

    const clickHandler = (event) => {
      if (event.target.id === 'register-button' || event.target.closest('#register-button')) {
        const wc = document.getElementById('lux-register');
        if (wc) wc.click();
      }
    };

    document.addEventListener('click', clickHandler);
    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, []);

  // Mostrar loading mientras se cargan los enlaces
  if (loading) {
    return (
      <main className="main-content">
        <div className="loading-container">
          <p>Cargando...</p>
        </div>
      </main>
    );
  }

  return (
    <>
      {/* Fondo animado */}
      <div className="background-container">
        <div className="scrolling-background"></div>
        <div className="dark-overlay"></div>
      </div>
      
      <main className="main-content">
        <div className="logo-container">
          <img src="/img/logo-new.webp" alt="Picante Sports Logo" className="site-logo" width="850" height="810" />
        </div>
        
        <div className="bonus-title">
          <h1>{phoneData.title}</h1>
        </div>
        
        <div className="registration-options">
          <h2 className="options-title">¡Elige tu forma de registro!</h2>
            
            <div className="registration-buttons">
              <div className="registration-option telegram-option" onClick={() => {
                trackEvent('Lead', { channel: 'telegram' });
                trackCustomEvent('TelegramRegisterClick');
                window.open(phoneData.telegram_link, '_blank');
              }}>
                <div className="option-icon">📱</div>
                <h3>Telegram VIP</h3>
                <p>✨ MÁXIMOS BENEFICIOS ✨</p>
                <ul>
                  <li>🎁 Bonos exclusivos</li>
                  <li>🚀 Promociones VIP</li>
                  <li>⚡ Soporte prioritario</li>
                  <li>💎 Torneos especiales</li>
                </ul>
                <button className="option-button telegram-btn">Registrarme VIP</button>
              </div>
              
              <div className="registration-option whatsapp-option" onClick={() => {
                trackEvent('Lead', { channel: 'whatsapp' });
                trackCustomEvent('WhatsappRegisterClick');
                window.open(phoneData.whatsapp_link, '_blank');
              }}>
                <div className="option-icon">💬</div>
                <h3>WhatsApp</h3>
                <p>Registro súper rápido</p>
                <ul>
                  <li>📞 Atención personal</li>
                  <li>💰 Bono bienvenida</li>
                  <li>🎯 Soporte directo</li>
                  <li>🔥 Registro express</li>
                </ul>
                <button className="option-button whatsapp-btn">Registrarme Ahora</button>
              </div>
            </div>
          </div>
          
          <div className="promo-text">
            <p>Crea tu cuenta rápido y seguro ✨</p>
            <p>Regístrate totalmente gratis en la plataforma más segura de Argentina. Contamos con más de 12000 Slots, la mejor deportiva y el mejor casino en vivo.</p>
            <p>✅ ¡Nosotros no tenemos límites de apuestas!</p>
            <p>✅ ¡Retira sin límite!</p>
          </div>

      </main>
    </>
  );
}

export default App;

