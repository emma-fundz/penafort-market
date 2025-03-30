
import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle, Package, Settings, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

import Navbar from '@/components/layout/Navbar';
import PageTransition from '@/components/layout/PageTransition';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Profile = () => {
  const { user, isAuthenticated, logout } = useUser();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="min-h-screen pt-32 pb-16 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row items-start gap-8">
                {/* Profile Sidebar */}
                <div className="w-full md:w-1/4 bg-white rounded-xl shadow-sm p-6 sticky top-32">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 mx-auto bg-penafort-gray-100 rounded-full flex items-center justify-center">
                      <UserCircle size={64} className="text-penafort-gray-400" />
                    </div>
                    <h2 className="mt-4 text-xl font-bold">{user?.name}</h2>
                    <p className="text-penafort-text-secondary">{user?.email}</p>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <nav>
                    <ul className="space-y-2">
                      <li>
                        <Button variant="ghost" className="w-full justify-start">
                          <UserCircle className="mr-2 h-5 w-5" />
                          My Profile
                        </Button>
                      </li>
                      <li>
                        <Button variant="ghost" className="w-full justify-start">
                          <Package className="mr-2 h-5 w-5" />
                          My Orders
                        </Button>
                      </li>
                      <li>
                        <Button variant="ghost" className="w-full justify-start">
                          <CreditCard className="mr-2 h-5 w-5" />
                          Payment Methods
                        </Button>
                      </li>
                      <li>
                        <Button variant="ghost" className="w-full justify-start">
                          <Settings className="mr-2 h-5 w-5" />
                          Settings
                        </Button>
                      </li>
                    </ul>
                  </nav>
                  
                  <Separator className="my-4" />
                  
                  <Button 
                    variant="destructive" 
                    className="w-full mt-4"
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                  >
                    Sign Out
                  </Button>
                </div>
                
                {/* Profile Content */}
                <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
                  <h1 className="text-2xl font-bold mb-6">My Profile</h1>
                  
                  <Tabs defaultValue="personal">
                    <TabsList>
                      <TabsTrigger value="personal">Personal Information</TabsTrigger>
                      <TabsTrigger value="address">Address</TabsTrigger>
                      <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="personal" className="mt-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-penafort-text-secondary mb-1">Full Name</label>
                          <div className="p-3 border rounded-md bg-penafort-gray-50">{user?.name}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-penafort-text-secondary mb-1">Email</label>
                          <div className="p-3 border rounded-md bg-penafort-gray-50">{user?.email}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-penafort-text-secondary mb-1">Phone Number</label>
                          <div className="p-3 border rounded-md bg-penafort-gray-50">Not set</div>
                        </div>
                        
                        <Button className="mt-4">Edit Information</Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="address" className="mt-6">
                      <div className="border rounded-md p-6 flex flex-col items-center justify-center text-center">
                        <p className="text-penafort-text-secondary mb-4">You haven't saved any addresses yet.</p>
                        <Button>Add a New Address</Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="preferences" className="mt-6">
                      <div className="border rounded-md p-6 flex flex-col items-center justify-center text-center">
                        <p className="text-penafort-text-secondary mb-4">Preferences will be available soon.</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </PageTransition>
      <Footer />
    </>
  );
};

export default Profile;
