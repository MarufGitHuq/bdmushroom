import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

const QuantitySelector = ({ 
  quantity, 
  onIncrease, 
  onDecrease, 
  min = 1, 
  max = 99,
  size = 'md'
}: QuantitySelectorProps) => {
  const sizeClasses = {
    sm: {
      container: 'h-8',
      button: 'h-8 w-8',
      text: 'w-8 text-sm'
    },
    md: {
      container: 'h-10',
      button: 'h-10 w-10',
      text: 'w-12 text-base'
    },
    lg: {
      container: 'h-12',
      button: 'h-12 w-12',
      text: 'w-16 text-lg'
    }
  };

  const classes = sizeClasses[size];

  return (
    <div className={`flex items-center border border-border rounded-lg overflow-hidden ${classes.container}`}>
      <Button
        variant="ghost"
        size="icon"
        className={`${classes.button} rounded-none hover:bg-muted`}
        onClick={onDecrease}
        disabled={quantity <= min}
      >
        <Minus className="h-4 w-4" />
      </Button>
      
      <span className={`${classes.text} text-center font-medium select-none`}>
        {quantity}
      </span>
      
      <Button
        variant="ghost"
        size="icon"
        className={`${classes.button} rounded-none hover:bg-muted`}
        onClick={onIncrease}
        disabled={quantity >= max}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuantitySelector;
