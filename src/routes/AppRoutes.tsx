import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Index from "@/pages/Index";
import Settings from "@/pages/Settings";
import CookieSettings from "@/pages/CookieSettings";
import WorkoutSuggestion from "@/pages/WorkoutSuggestion";
import MealPlanGenerator from "@/pages/MealPlanGenerator";
import BMICalculator from "@/components/calculators/BMICalculator";
import BodyFatCalculator from "@/components/calculators/BodyFatCalculator";
import CalorieCalculator from "@/components/calculators/CalorieCalculator";
import CaloriesBurnedCalculator from "@/components/calculators/CaloriesBurnedCalculator";
import MacronutrientCalculator from "@/components/calculators/MacronutrientCalculator";
import LeanBodyMassCalculator from "@/components/calculators/LeanBodyMassCalculator";
import WeightGoalCalculator from "@/components/calculators/WeightGoalCalculator";
import WaterIntakeCalculator from "@/components/calculators/WaterIntakeCalculator";
import OneRepMaxCalculator from "@/components/calculators/OneRepMaxCalculator";
import HeartRateZoneCalculator from "@/components/calculators/HeartRateZoneCalculator";
import GlycemicLoadCalculator from "@/components/calculators/GlycemicLoadCalculator";
import MealCalorieCalculator from "@/components/calculators/MealCalorieCalculator";
import IdealBodyWeightCalculator from "@/components/calculators/IdealBodyWeightCalculator";
import WaistToHipCalculator from "@/components/calculators/WaistToHipCalculator";
import TotalFitCalculator from "@/components/calculators/TotalFitCalculator";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cookie-settings" element={<CookieSettings />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/workout-suggestion" element={<ProtectedRoute><WorkoutSuggestion /></ProtectedRoute>} />
      <Route path="/meal-plan-generator" element={<ProtectedRoute><MealPlanGenerator /></ProtectedRoute>} />
      <Route path="/bmi-calculator" element={<ProtectedRoute><BMICalculator /></ProtectedRoute>} />
      <Route path="/body-fat-calculator" element={<ProtectedRoute><BodyFatCalculator /></ProtectedRoute>} />
      <Route path="/calorie-calculator" element={<ProtectedRoute><CalorieCalculator /></ProtectedRoute>} />
      <Route path="/calories-burned-calculator" element={<ProtectedRoute><CaloriesBurnedCalculator /></ProtectedRoute>} />
      <Route path="/macronutrient-calculator" element={<ProtectedRoute><MacronutrientCalculator /></ProtectedRoute>} />
      <Route path="/lean-body-mass-calculator" element={<ProtectedRoute><LeanBodyMassCalculator /></ProtectedRoute>} />
      <Route path="/weight-goal-calculator" element={<ProtectedRoute><WeightGoalCalculator /></ProtectedRoute>} />
      <Route path="/water-intake-calculator" element={<ProtectedRoute><WaterIntakeCalculator /></ProtectedRoute>} />
      <Route path="/one-rep-max-calculator" element={<ProtectedRoute><OneRepMaxCalculator /></ProtectedRoute>} />
      <Route path="/heart-rate-zone-calculator" element={<ProtectedRoute><HeartRateZoneCalculator /></ProtectedRoute>} />
      <Route path="/glycemic-load-calculator" element={<ProtectedRoute><GlycemicLoadCalculator /></ProtectedRoute>} />
      <Route path="/meal-calorie-calculator" element={<ProtectedRoute><MealCalorieCalculator /></ProtectedRoute>} />
      <Route path="/ideal-body-weight-calculator" element={<ProtectedRoute><IdealBodyWeightCalculator /></ProtectedRoute>} />
      <Route path="/waist-to-hip-calculator" element={<ProtectedRoute><WaistToHipCalculator /></ProtectedRoute>} />
      <Route path="/total-fit-calculator" element={<ProtectedRoute><TotalFitCalculator /></ProtectedRoute>} />
      
      {/* Catch all undefined routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);

export default AppRoutes;