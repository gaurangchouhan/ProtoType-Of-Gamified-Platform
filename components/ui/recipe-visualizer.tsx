"use client"

interface RecipeState {
  ingredients: string[]
  steps_completed: string[]
  cooking_time: number
  temperature: string
  taste: string
}

interface Recipe {
  name: string
  ingredients: string[]
}

interface RecipeVisualizerProps {
  state: RecipeState
  recipe: Recipe
}

export function RecipeVisualizer({ state, recipe }: RecipeVisualizerProps) {
  const getTemperatureEmoji = () => {
    switch (state.temperature) {
      case "hot":
        return "🔥"
      case "warm":
        return "🌡️"
      default:
        return "❄️"
    }
  }

  const getTasteEmoji = () => {
    switch (state.taste) {
      case "sweet":
        return "🍯"
      case "spicy":
        return "🌶️"
      case "creamy":
        return "🥛"
      default:
        return "😐"
    }
  }

  return (
    <div className="space-y-6">
      {/* Cooking Pot Visualization */}
      <div className="text-center p-6 bg-gradient-to-b from-orange-100 to-yellow-100 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg">
        <div className="text-6xl mb-4">🍲</div>
        <div className="flex justify-center space-x-2 text-2xl mb-4">
          {state.ingredients.map((ingredient, index) => {
            const ingredientEmojis: { [key: string]: string } = {
              boiled_water: "💧",
              hot_oil: "🫒",
              tea_leaves: "🍃",
              onions: "🧅",
              milk: "🥛",
              sugar: "🍯",
              tomatoes: "🍅",
              spices: "🌶️",
              vegetables: "🥕",
            }
            return (
              <span key={index} className="animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                {ingredientEmojis[ingredient] || "🥄"}
              </span>
            )
          })}
        </div>
        <div className="flex justify-center space-x-4 text-3xl">
          <span title="Temperature">{getTemperatureEmoji()}</span>
          <span title="Taste">{getTasteEmoji()}</span>
        </div>
      </div>

      {/* Recipe Progress */}
      <div className="space-y-3">
        <h4 className="font-medium">Recipe Progress</h4>
        <div className="space-y-2">
          {recipe.ingredients.map((ingredient, index) => {
            const isAdded = state.ingredients.some((added) => added.includes(ingredient.replace("_", "")))
            return (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full ${isAdded ? "bg-green-500" : "bg-muted"}`} />
                <span className={`text-sm ${isAdded ? "text-foreground" : "text-muted-foreground"}`}>
                  {ingredient.replace("_", " ")}
                </span>
                {isAdded && <span className="text-green-500">✓</span>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Cooking Techniques Used */}
      <div className="space-y-3">
        <h4 className="font-medium">Techniques Mastered</h4>
        <div className="flex flex-wrap gap-2">
          {state.steps_completed.map((step, index) => {
            const stepNames: { [key: string]: string } = {
              stirred_properly: "Proper Stirring",
              conditional_cooking: "Conditional Logic",
              correct_sequence: "Correct Sequence",
            }
            return (
              <div key={index} className="px-2 py-1 bg-green-500/20 text-green-700 dark:text-green-300 rounded text-xs">
                {stepNames[step] || step}
              </div>
            )
          })}
        </div>
      </div>

      {/* Cooking Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold">{state.ingredients.length}</p>
          <p className="text-xs text-muted-foreground">Ingredients</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{state.steps_completed.length}</p>
          <p className="text-xs text-muted-foreground">Techniques</p>
        </div>
        <div>
          <p className="text-2xl font-bold">
            {Math.round((state.ingredients.length / recipe.ingredients.length) * 100)}%
          </p>
          <p className="text-xs text-muted-foreground">Complete</p>
        </div>
      </div>
    </div>
  )
}
