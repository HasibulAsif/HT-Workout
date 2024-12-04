import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Calculator, Activity, Dumbbell } from "lucide-react";

interface CalculationResults {
  bmi: number;
  bmiCategory: string;
  bmr: number;
  tdee: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  waterIntake: number;
  sleepRecommendation: string;
  walkingGoal: string;
  workoutSuggestions: string[];
}

const TotalFitCalculator = () => {
  const [useMetric, setUseMetric] = useState(true);
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: '',
    activityLevel: '',
    fitnessGoal: '',
    timeframe: '',
    weightGoal: ''
  });
  const [results, setResults] = useState<CalculationResults | null>(null);

  const activityMultipliers = {
    sedentary: 1.2,
    lightlyActive: 1.375,
    moderatelyActive: 1.55,
    veryActive: 1.725,
    extremelyActive: 1.9
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const convertToMetric = (value: number, type: 'weight' | 'height'): number => {
    if (useMetric) return value;
    return type === 'weight' ? value * 0.453592 : value * 2.54;
  };

  const calculateResults = () => {
    if (!formData.age || !formData.weight || !formData.height || !formData.gender || !formData.activityLevel) {
      toast.error("Please fill in all required fields");
      return;
    }

    const weightKg = convertToMetric(parseFloat(formData.weight), 'weight');
    const heightCm = convertToMetric(parseFloat(formData.height), 'height');

    // Calculate BMI
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);

    // Determine BMI category
    let bmiCategory = '';
    if (bmi < 18.5) bmiCategory = 'Underweight';
    else if (bmi < 25) bmiCategory = 'Normal weight';
    else if (bmi < 30) bmiCategory = 'Overweight';
    else bmiCategory = 'Obese';

    // Calculate BMR using Mifflin-St Jeor equation
    let bmr;
    if (formData.gender === 'male') {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * parseInt(formData.age)) + 5;
    } else {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * parseInt(formData.age)) - 161;
    }

    // Calculate TDEE
    const tdee = bmr * activityMultipliers[formData.activityLevel as keyof typeof activityMultipliers];

    // Calculate macros based on fitness goal
    let macros = { protein: 0, carbs: 0, fats: 0 };
    switch (formData.fitnessGoal) {
      case 'muscleGain':
        macros = {
          protein: weightKg * 2.2, // 2.2g per kg
          fats: weightKg * 0.8, // 0.8g per kg
          carbs: (tdee - ((weightKg * 2.2 * 4) + (weightKg * 0.8 * 9))) / 4 // Remaining calories from carbs
        };
        break;
      case 'weightLoss':
        macros = {
          protein: weightKg * 2, // 2g per kg
          fats: weightKg * 0.6, // 0.6g per kg
          carbs: (tdee * 0.8 - ((weightKg * 2 * 4) + (weightKg * 0.6 * 9))) / 4 // 20% deficit
        };
        break;
      default: // maintenance
        macros = {
          protein: weightKg * 1.8, // 1.8g per kg
          fats: weightKg * 0.7, // 0.7g per kg
          carbs: (tdee - ((weightKg * 1.8 * 4) + (weightKg * 0.7 * 9))) / 4
        };
    }

    // Calculate water intake (in liters)
    const waterIntake = weightKg * 0.033;

    // Generate workout suggestions
    const workoutSuggestions = generateWorkoutSuggestions(formData.fitnessGoal);

    setResults({
      bmi,
      bmiCategory,
      bmr,
      tdee,
      macros,
      waterIntake,
      sleepRecommendation: '7-9 hours per night',
      walkingGoal: '10,000 steps (approximately 8 kilometers)',
      workoutSuggestions
    });

    toast.success("Calculations completed!");
  };

  const generateWorkoutSuggestions = (goal: string): string[] => {
    switch (goal) {
      case 'muscleGain':
        return [
          'Progressive overload strength training 4-5 times per week',
          'Focus on compound exercises (squats, deadlifts, bench press)',
          'Rest 1-2 minutes between sets',
          'Aim for 8-12 reps per set'
        ];
      case 'weightLoss':
        return [
          'High-intensity interval training (HIIT) 3-4 times per week',
          'Strength training 2-3 times per week',
          'Cardio sessions 30-45 minutes',
          'Active recovery days with light walking'
        ];
      default:
        return [
          'Mixed cardio and strength training 3-4 times per week',
          'Bodyweight exercises',
          'Flexibility and mobility work',
          'Regular walking or light cardio'
        ];
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="p-6 w-full max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="w-6 h-6" />
          <h2 className="text-2xl font-bold">TotalFit Calculator</h2>
        </div>

        <div className="flex justify-end mb-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="metric">Metric Units</Label>
            <Switch
              id="metric"
              checked={useMetric}
              onCheckedChange={setUseMetric}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Age</Label>
              <Input
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
              />
            </div>

            <div>
              <Label>Gender</Label>
              <Select onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Weight ({useMetric ? 'kg' : 'lbs'})</Label>
              <Input
                type="number"
                placeholder={`Enter weight in ${useMetric ? 'kg' : 'lbs'}`}
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
              />
            </div>

            <div>
              <Label>Height ({useMetric ? 'cm' : 'inches'})</Label>
              <Input
                type="number"
                placeholder={`Enter height in ${useMetric ? 'cm' : 'inches'}`}
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
              />
            </div>

            <div>
              <Label>Activity Level</Label>
              <Select onValueChange={(value) => handleInputChange('activityLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="lightlyActive">Lightly Active</SelectItem>
                  <SelectItem value="moderatelyActive">Moderately Active</SelectItem>
                  <SelectItem value="veryActive">Very Active</SelectItem>
                  <SelectItem value="extremelyActive">Extremely Active</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Fitness Goal</Label>
              <RadioGroup 
                onValueChange={(value) => handleInputChange('fitnessGoal', value)}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="muscleGain" id="muscleGain" />
                  <Label htmlFor="muscleGain">Muscle Gain</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weightLoss" id="weightLoss" />
                  <Label htmlFor="weightLoss">Weight Loss</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maintenance" id="maintenance" />
                  <Label htmlFor="maintenance">Maintenance</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {(formData.fitnessGoal === 'muscleGain' || formData.fitnessGoal === 'weightLoss') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Timeframe (weeks)</Label>
                <Input
                  type="number"
                  placeholder="Enter timeframe"
                  value={formData.timeframe}
                  onChange={(e) => handleInputChange('timeframe', e.target.value)}
                />
              </div>
              <div>
                <Label>Target Weight ({useMetric ? 'kg' : 'lbs'})</Label>
                <Input
                  type="number"
                  placeholder="Enter target weight"
                  value={formData.weightGoal}
                  onChange={(e) => handleInputChange('weightGoal', e.target.value)}
                />
              </div>
            </div>
          )}

          <Button 
            onClick={calculateResults}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Calculate Fitness Metrics
          </Button>
        </div>
      </Card>

      {results && (
        <Card className="p-6 w-full max-w-2xl mx-auto">
          <Tabs defaultValue="metrics" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="metrics">
                <Calculator className="w-4 h-4 mr-2" />
                Metrics
              </TabsTrigger>
              <TabsTrigger value="nutrition">
                <Activity className="w-4 h-4 mr-2" />
                Nutrition
              </TabsTrigger>
              <TabsTrigger value="workout">
                <Dumbbell className="w-4 h-4 mr-2" />
                Workout
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="metrics" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary rounded-lg">
                  <h3 className="font-semibold mb-2">BMI</h3>
                  <p>{results.bmi.toFixed(1)} ({results.bmiCategory})</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <h3 className="font-semibold mb-2">BMR</h3>
                  <p>{Math.round(results.bmr)} calories/day</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <h3 className="font-semibold mb-2">Daily Calories</h3>
                  <p>{Math.round(results.tdee)} calories/day</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <h3 className="font-semibold mb-2">Water Intake</h3>
                  <p>{results.waterIntake.toFixed(1)} liters/day</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="nutrition" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-secondary rounded-lg">
                  <h3 className="font-semibold mb-2">Macronutrient Breakdown</h3>
                  <ul className="space-y-2">
                    <li>Protein: {Math.round(results.macros.protein)}g</li>
                    <li>Carbs: {Math.round(results.macros.carbs)}g</li>
                    <li>Fats: {Math.round(results.macros.fats)}g</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="workout" className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-secondary rounded-lg">
                  <h3 className="font-semibold mb-2">Workout Recommendations</h3>
                  <ul className="space-y-2">
                    {results.workoutSuggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <h3 className="font-semibold mb-2">Daily Activity Goals</h3>
                  <p>Walking Goal: {results.walkingGoal}</p>
                  <p>Sleep: {results.sleepRecommendation}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      )}
    </div>
  );
};

export default TotalFitCalculator;