
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import PageTransition from '@/components/layout/PageTransition';
import Footer from '@/components/layout/Footer';
import LoginForm from '@/components/auth/LoginForm';
import SocialLogin from '@/components/auth/SocialLogin';
import AuthDivider from '@/components/auth/AuthDivider';
import CreateAccountPrompt from '@/components/auth/CreateAccountPrompt';
import TermsFooter from '@/components/auth/TermsFooter';

const Login = () => {
  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="min-h-screen pt-24 pb-16 px-4 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <motion.h1 
                className="text-3xl font-bold mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Welcome Back
              </motion.h1>
              <motion.p 
                className="text-penafort-text-secondary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Sign in to your Penafort account
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              {/* Social login options */}
              <SocialLogin />
              
              <AuthDivider />

              {/* Login form */}
              <LoginForm />

              <CreateAccountPrompt />
            </motion.div>

            <TermsFooter />
          </motion.div>
        </main>
      </PageTransition>
      <Footer />
    </>
  );
};

export default Login;
