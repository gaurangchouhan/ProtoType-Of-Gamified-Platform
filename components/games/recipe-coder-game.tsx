"use client"

import { useState, useEffect } from "react"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"
import { FloatingParticles } from "@/components/ui/floating-particles"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CodeEditor } from "@/components/ui/code-editor"
import { RecipeVisualizer } from "@/components/ui/recipe-visualizer"

const recipes = [
  {
    id: 1,
    name: "Simple Tea",
    description: "Learn sequencing by making perfect tea",
    difficulty: "Beginner",
    ingredients: ["water", "tea_leaves", "sugar", "milk"],
    steps: [
      { action: "boil", target: "water", duration: 5 },
      { action: "add", target: "tea_leaves", condition: "water_boiling" },
      { action: "stir", target: "mixture", loops: 3 },
      { action: "add", target: "milk", condition: "tea_ready" },
      { action: "add", target: "sugar", condition: "taste_preference" },
    ],
    initialCode: `// Recipe: Simple Tea
// Follow the correct sequence to make tea

function makeTea() {
  // Step 1: Start with water
  
  // Step 2: Add tea leaves when water is boiling
  
  // Step 3: Stir the mixture
  
  // Step 4: Add milk and sugar
  
}

makeTea();`,
    solution: `function makeTea() {
  boil("water", 5);
  if (isBoiling("water")) {
    add("tea_leaves");
    for (let i = 0; i < 3; i++) {
      stir("mixture");
    }
    add("milk");
    add("sugar");
  }
}`,
  },
  {
    id: 2,
    name: "Spicy vs Mild Curry",
    description: "Use conditional logic for different spice levels",
    difficulty: "Intermediate",
    ingredients: ["onions", "tomatoes", "spices", "vegetables", "oil"],
    steps: [
      { action: "heat", target: "oil", duration: 2 },
      { action: "add", target: "onions", condition: "oil_hot" },
      { action: "cook", target: "onions", duration: 5 },
      { action: "add", target: "tomatoes", condition: "onions_golden" },
      { action: "conditional_add", target: "spices", condition: "spice_preference" },
      { action: "add", target: "vegetables", condition: "base_ready" },
    ],
    initialCode: `// Recipe: Spicy vs Mild Curry
// Use IF/ELSE to adjust spice level

let spiceLevel = "mild"; // Change to "spicy" for hot curry

function makeCurry() {
  // Heat oil first
  
  // Add onions and cook until golden
  
  // Add tomatoes
  
  // Use conditional logic for spices
  if (spiceLevel === "spicy") {
    // Add more spices for spicy version
  } else {
    // Add fewer spices for mild version
  }
  
  // Add vegetables
  
}

makeCurry();`,
    solution: `function makeCurry() {
  heat("oil", 2);
  if (isHot("oil")) {
    add("onions");
    cook("onions", 5);
    add("tomatoes");
    
    if (spiceLevel === "spicy") {
      add("spices", 3);
      add("chili_powder", 2);
    } else {
      add("spices", 1);
    }
    
    add("vegetables");
  }
}`,
  },
]

export function RecipeCoderGame() {
  const [currentRecipe, setCurrentRecipe] = useState(0)
  const [code, setCode] = useState(recipes[0].initialCode)
  const [recipeState, setRecipeState] = useState<any>({
    ingredients: [],
    steps_completed: [],
    cooking_time: 0,
    temperature: "cold",
    taste: "bland",
  })
  const [isRunning, setIsRunning] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [chefPoints, setChefPoints] = useState(0)
  const [completedRecipes, setCompletedRecipes] = useState<number[]>([])

  const recipe = recipes[currentRecipe]

  useEffect(() => {
    setCode(recipe.initialCode)
    setRecipeState({
      ingredients: [],
      steps_completed: [],
      cooking_time: 0,
      temperature: "cold",
      taste: "bland",
    })
    setFeedback("")
  }, [currentRecipe, recipe])

  const runCode = () => {
    setIsRunning(true)
    setFeedback("Cooking your recipe...")

    // Simulate code execution
    setTimeout(() => {
      const newState = { ...recipeState }
      let score = 0

      // Analyze code for cooking actions
      if (code.includes('boil("water"')) {
        newState.ingredients.push("boiled_water")
        newState.temperature = "hot"
        score += 20
      }

      if (code.includes('heat("oil"')) {
        newState.ingredients.push("hot_oil")
        newState.temperature = "hot"
        score += 15
      }

      if (code.includes('add("tea_leaves")')) {
        newState.ingredients.push("tea_leaves")
        score += 15
      }

      if (code.includes('add("onions")')) {
        newState.ingredients.push("onions")
        score += 10
      }

      if (code.includes('add("milk")')) {
        newState.ingredients.push("milk")
        newState.taste = "creamy"
        score += 10
      }

      if (code.includes('add("sugar")')) {
        newState.ingredients.push("sugar")
        newState.taste = "sweet"
        score += 10
      }

      if (code.includes("for") && code.includes("stir")) {
        newState.steps_completed.push("stirred_properly")
        score += 25
      }

      if (code.includes("if") && code.includes("spiceLevel")) {
        newState.steps_completed.push("conditional_cooking")
        score += 30
      }

      // Check sequence correctness
      const hasCorrectSequence = code.indexOf('boil("water"') < code.indexOf('add("tea_leaves"')
      if (hasCorrectSequence) {
        score += 20
        newState.steps_completed.push("correct_sequence")
      }

      setRecipeState(newState)

      // Determine success
      const requiredIngredients = recipe.ingredients.length
      const addedIngredients = newState.ingredients.length
      const completionRate = (addedIngredients / requiredIngredients) * 100

      if (completionRate >= 80 && score >= 80) {
        setFeedback("🎉 Perfect recipe! Your dish is delicious!")
        setChefPoints((prev) => prev + score)
        setCompletedRecipes((prev) => [...prev, recipe.id])
      } else if (completionRate >= 60) {
        setFeedback("Good effort! Your dish is edible but could use some improvements.")
        setChefPoints((prev) => prev + Math.floor(score * 0.7))
      } else {
        setFeedback("Oops! Something went wrong. Check your recipe steps and try again.")
      }

      setIsRunning(false)
    }, 2500)
  }

  const resetRecipe = () => {
    setCode(recipe.initialCode)
    setRecipeState({
      ingredients: [],
      steps_completed: [],
      cooking_time: 0,
      temperature: "cold",
      taste: "bland",
    })
    setFeedback("")
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingParticles count={20} />

      {/* Header */}
      <header className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-3xl animate-float">
              👨‍🍳
            </div>
            <div>
              <h1 className="text-3xl font-bold holographic">Recipe Coder</h1>
              <p className="text-muted-foreground">Learn programming through cooking!</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="animate-glow">
              Chef Points: {chefPoints}
            </Badge>
            <Button variant="outline" className="glassmorphism bg-transparent">
              Recipes: {completedRecipes.length}/{recipes.length}
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Recipe Selection */}
        <GlassmorphismCard>
          <h2 className="text-xl font-bold mb-4">Choose Your Recipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recipes.map((r, index) => (
              <button
                key={r.id}
                onClick={() => setCurrentRecipe(index)}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                  currentRecipe === index ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                } ${completedRecipes.includes(r.id) ? "bg-green-500/10 border-green-500" : ""}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{r.name}</h3>
                  {completedRecipes.includes(r.id) && <span className="text-green-500">✅</span>}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{r.description}</p>
                <Badge variant="outline" className="text-xs">
                  {r.difficulty}
                </Badge>
              </button>
            ))}
          </div>
        </GlassmorphismCard>

        {/* Cooking Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <GlassmorphismCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recipe Code</h3>
              <div className="flex space-x-2">
                <Button onClick={runCode} disabled={isRunning} className="bg-orange-500 hover:bg-orange-600">
                  {isRunning ? "Cooking..." : "Cook Recipe"}
                </Button>
                <Button variant="outline" onClick={resetRecipe} className="bg-transparent">
                  Reset
                </Button>
              </div>
            </div>
            <CodeEditor value={code} onChange={setCode} language="javascript" />
            {feedback && (
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-sm">{feedback}</p>
              </div>
            )}
          </GlassmorphismCard>

          {/* Recipe Visualizer */}
          <GlassmorphismCard>
            <h3 className="text-lg font-semibold mb-4">Kitchen Status</h3>
            <RecipeVisualizer state={recipeState} recipe={recipe} />
          </GlassmorphismCard>
        </div>

        {/* Cooking Functions Reference */}
        <GlassmorphismCard>
          <h3 className="text-lg font-semibold mb-4">Available Cooking Functions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-3 bg-muted/30 rounded-lg">
              <h4 className="font-medium text-blue-500">boil(ingredient, time)</h4>
              <p className="text-sm text-muted-foreground">Boils an ingredient for specified time</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <h4 className="font-medium text-orange-500">heat(ingredient, time)</h4>
              <p className="text-sm text-muted-foreground">Heats an ingredient</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <h4 className="font-medium text-green-500">add(ingredient)</h4>
              <p className="text-sm text-muted-foreground">Adds an ingredient to the recipe</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <h4 className="font-medium text-purple-500">stir(mixture)</h4>
              <p className="text-sm text-muted-foreground">Stirs the cooking mixture</p>
            </div>
          </div>
        </GlassmorphismCard>
      </div>
    </div>
  )
}
