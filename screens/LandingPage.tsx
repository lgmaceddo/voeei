
import React from 'react';
import { Plan } from '../types';
import { Navbar } from './landing/Navbar';
import { Hero } from './landing/Hero';
import { Features } from './landing/Features';
import { ANACBlocks } from './landing/ANACBlocks';
import { Pricing } from './landing/Pricing';
import { Testimonials } from './landing/Testimonials';
import { FAQ } from './landing/FAQ';
import { Footer } from './landing/Footer';

interface LandingPageProps {
    onLoginClick: (mode?: 'LOGIN' | 'SIGNUP') => void;
    plans: Plan[];
    features: any[];
}

const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick, plans, features }) => {
    return (
        <div className="min-h-screen bg-aviation-slate-50 selection:bg-aviation-primary/20 selection:text-aviation-primary font-sans text-aviation-slate-800">
            <Navbar onLoginClick={onLoginClick} />
            <main>
                <Hero onLoginClick={onLoginClick} />
                <Features features={features} />
                <ANACBlocks />
                <Pricing plans={plans} onLoginClick={onLoginClick} />
                <Testimonials />
                <FAQ onLoginClick={onLoginClick} />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
