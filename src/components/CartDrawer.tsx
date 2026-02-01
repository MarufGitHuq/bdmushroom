import { X, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "@/context/CartContext";

const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart
  } = useCart();

  const total = getCartTotal();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-background p-0">
        <SheetHeader className="space-y-0 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-heading text-xl">
              Your Cart ({items.length})
            </SheetTitle>
            {items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-muted-foreground hover:text-destructive"
              >
                Clear All
              </Button>
            )}
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">
              Your cart is empty
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Add some delicious mushrooms to get started!
            </p>
            <Button onClick={() => setIsCartOpen(false)} asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.key}
                    className="flex gap-4 p-3 bg-card rounded-lg border border-border"
                  >
                    {/* Product Image */}
                    <Link
                      to={`/product/${item.slug}`}
                      onClick={() => setIsCartOpen(false)}
                      className="shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.slug}`}
                        onClick={() => setIsCartOpen(false)}
                      >
                        <h4 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
                          {item.name}
                        </h4>
                      </Link>
                      <p className="font-semibold text-secondary mt-1">
                        ৳{item.price}
                      </p>

                      {/* Quantity & Remove */}
                      <div className="flex items-center justify-between mt-2">
                        <QuantitySelector
                          quantity={item.quantity}
                          onIncrease={() => updateQuantity(item.key, item.quantity + 1)}
                          onDecrease={() => updateQuantity(item.key, item.quantity - 1)}
                          size="sm"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item.key)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="pt-4 space-y-4">
              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">৳{total.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="font-heading text-lg font-semibold">Total</span>
                <span className="font-heading text-xl font-bold text-secondary">
                  ৳{total.toFixed(0)}
                </span>
              </div>

              <Button
                className="w-full"
                size="lg"
                asChild
                onClick={() => setIsCartOpen(false)}
              >
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsCartOpen(false)}
                asChild
              >
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
