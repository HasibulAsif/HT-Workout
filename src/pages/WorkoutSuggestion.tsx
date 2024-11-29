import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, Sparkles, Target, Trophy, Activity } from "lucide-react";

const WorkoutSuggestion = () => {
  // This will be replaced with actual data from calculators once database is integrated
  const mockMetrics = {
    bmi: 23.5,
    bodyFat: 18,
    calorieNeeds: 2500,
    fitnessLevel: "Intermediate"
  };

  const downloadPlan = () => {
    // To be implemented with actual PDF generation
    console.log("Downloading plan...");
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient h-64 mb-8">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative h-full flex items-center justify-center p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Your Personalized Workout Plan</h1>
            <p className="text-white/90">Based on your fitness metrics and goals</p>
          </div>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(mockMetrics).map(([key, value]) => (
          <Card key={key} className="p-6 glass-morphism hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <h3 className="text-lg font-semibold capitalize mb-2">{key.replace(/([A-Z])/g, ' $1')}</h3>
              <p className="text-2xl font-bold text-primary">{value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Weekly Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Workout Routines */}
        <Card className="p-6 glass-morphism">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-6 w-6 text-primary animate-pulse" />
            <h2 className="text-2xl font-bold">Recommended Routines</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <h3 className="font-semibold flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Cardio Training
              </h3>
              <p className="text-sm text-gray-300 mt-2">30 minutes of moderate-intensity cardio, 3-4 times per week</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <h3 className="font-semibold flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Strength Training
              </h3>
              <p className="text-sm text-gray-300 mt-2">Full-body workout with progressive overload, 3 times per week</p>
            </div>
          </div>
        </Card>

        {/* Weekly Schedule */}
        <Card className="p-6 glass-morphism">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            <h2 className="text-2xl font-bold">Weekly Schedule</h2>
          </div>
          <div className="space-y-3">
            {['Monday', 'Wednesday', 'Friday'].map((day) => (
              <div key={day} className="p-3 bg-white/5 rounded-lg">
                <h3 className="font-semibold">{day}</h3>
                <p className="text-sm text-gray-300">Strength Training + 20min Cardio</p>
              </div>
            ))}
            {['Tuesday', 'Thursday'].map((day) => (
              <div key={day} className="p-3 bg-white/5 rounded-lg">
                <h3 className="font-semibold">{day}</h3>
                <p className="text-sm text-gray-300">30min Cardio + Flexibility Work</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Download Section */}
      <Card className="p-6 glass-morphism text-center">
        <Rocket className="h-8 w-8 text-primary mx-auto mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold mb-4">Ready to Start Your Fitness Journey?</h2>
        <Button 
          onClick={downloadPlan}
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          Download Complete Plan
        </Button>
      </Card>
    </div>
  );
};

export default WorkoutSuggestion;