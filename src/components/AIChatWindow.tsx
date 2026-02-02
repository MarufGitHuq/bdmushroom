import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { searchProducts, getProductRecommendations, formatProductForChat } from "@/lib/product-search";
import { useCart } from "@/context/CartContext";
import { getProductBySlug } from "@/services/commerce-service";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  products?: {
    id: number;
    name: string;
    slug: string;
    price: string;
    inStock: boolean;
  }[];
}

import { useAuth } from "@/hooks/useAuth";
import { getCustomerOrders, getCustomerByEmail } from "@/services/commerce-service";

const AIChatWindow = () => {
  const { user, isAuthenticated } = useAuth();
  const [customerContext, setCustomerContext] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "👋 Welcome to BD Mushroom! I'm here to help you find the perfect mushrooms. You can ask me things like:\n\n• \"Show me fresh mushrooms\"\n• \"What's good for immune health?\"\n• \"Products under ৳500\"\n• \"On sale items\""
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  // 1. Data Gathering Logic: Fetching Customer History
  useEffect(() => {
    const fetchContext = async () => {
      if (isAuthenticated && user?.user_email) {
        try {
          const customer = await getCustomerByEmail(user.user_email);
          if (customer) {
            const orders = await getCustomerOrders(customer.id);
            const history = orders.map(o => ({
              id: o.id,
              items: o.line_items.map((i: any) => i.name).join(', '),
              status: o.status
            }));

            setCustomerContext({
              name: customer.first_name || user.user_display_name,
              lastOrder: history[0] || null,
              orderHistory: history
            });
          }
        } catch (error) {
          console.warn("AI Context gathering failed:", error);
        }
      } else {
        setCustomerContext(null);
      }
    };
    fetchContext();
  }, [isAuthenticated, user]);

  const getAssistantContext = () => {
    if (!customerContext) return "Unknown Guest";
    const lastOrderStr = customerContext.lastOrder
      ? `Last Order: #${customerContext.lastOrder.id} (${customerContext.lastOrder.items}), Status: ${customerContext.lastOrder.status}`
      : "No previous orders";

    return `Customer: ${customerContext.name}. ${lastOrderStr}.`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleOpenChat = (e: any) => {
      setIsOpen(true);
      if (e.detail?.message) {
        // Automatically send the message from the dashboard trigger
        handleSend(e.detail.message);
      }
    };
    window.addEventListener('open-ai-chat', handleOpenChat);
    return () => window.removeEventListener('open-ai-chat', handleOpenChat);
  }, [customerContext]); // Re-bind if context changes

  const processQuery = (query: string): Message => {
    const queryLower = query.toLowerCase();

    // Check for recommendation types
    if (queryLower.includes('featured') || queryLower.includes('popular') || queryLower.includes('best')) {
      const results = getProductRecommendations('featured');
      return createProductMessage(`Here are our featured products:`, results.products);
    }

    if (queryLower.includes('sale') || queryLower.includes('discount') || queryLower.includes('offer')) {
      const results = getProductRecommendations('sale');
      if (results.products.length === 0) {
        return { id: Date.now().toString(), role: 'assistant', content: "No items are currently on sale, but check back soon!" };
      }
      return createProductMessage(`🏷️ Here are our current sale items:`, results.products);
    }

    if (queryLower.includes('fresh')) {
      const results = getProductRecommendations('fresh');
      return createProductMessage(`🌿 Here are our fresh mushroom options:`, results.products);
    }

    if (queryLower.includes('immune') || queryLower.includes('health') || queryLower.includes('medicinal') || queryLower.includes('powder')) {
      const results = getProductRecommendations('medicinal');
      return createProductMessage(`💪 These mushroom powders are great for health:`, results.products);
    }

    // Price-based queries
    const priceMatch = queryLower.match(/under\s*৳?\s*(\d+)|below\s*৳?\s*(\d+)|less than\s*৳?\s*(\d+)/);
    if (priceMatch) {
      const maxPrice = parseInt(priceMatch[1] || priceMatch[2] || priceMatch[3]);
      const results = searchProducts({ maxPrice, inStockOnly: true });
      if (results.products.length === 0) {
        return { id: Date.now().toString(), role: 'assistant', content: `No products found under ৳${maxPrice}. Try a higher budget?` };
      }
      return createProductMessage(`Products under ৳${maxPrice}:`, results.products);
    }

    // Category searches
    const categories = ['dried', 'growing', 'spawn', 'kit', 'equipment'];
    for (const cat of categories) {
      if (queryLower.includes(cat)) {
        const results = searchProducts({ keyword: cat });
        if (results.products.length > 0) {
          return createProductMessage(`Here's what I found for "${cat}":`, results.products);
        }
      }
    }

    // General search
    const results = searchProducts({ keyword: query });
    if (results.products.length > 0) {
      return createProductMessage(`Here's what I found:`, results.products);
    }

    // No results
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: `I couldn't find products matching "${query}". Try:\n• "fresh mushrooms"\n• "medicinal powders"\n• "growing kits"\n• "products on sale"`
    };
  };

  const createProductMessage = (intro: string, products: any[]): Message => {
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: intro,
      products: products.slice(0, 4).map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        inStock: p.inStock
      }))
    };
  };

  const handleSend = async (customMessage?: string) => {
    const textToSend = customMessage || input;
    if (!textToSend.trim() || isLoading) return;

    // 2. Contextual Handshake: Define persona and context
    if (customerContext) {
      console.log("--- AI SYSTEM HANDSHAKE ---");
      console.log(`Persona: BDMushroom Expert`);
      console.log(`Context: ${getAssistantContext()}`);
      console.log(`Instruction: Be helpful, scientific, and concise.`);
      console.log("----------------------------");
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const response = processQuery(userMessage.content);
    setMessages(prev => [...prev, response]);
    setIsLoading(false);
  };

  const handleQuickAdd = async (slug: string) => {
    const product = await getProductBySlug(slug);
    if (product) {
      addToCart(product.id, 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-20 md:bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-20 md:bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-background border border-border rounded-2xl shadow-2xl transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center relative">
              🍄
              {customerContext && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-primary rounded-full" title="Context Loaded" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Mushroom Assistant</h3>
                {customerContext && (
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] uppercase tracking-tighter opacity-70 font-bold">Known</span>
                  </div>
                )}
              </div>
              <p className="text-xs opacity-80">
                {customerContext ? `Hi, ${customerContext.name}!` : "Ask me about products"}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/20"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="h-[350px] p-4">
          <div className="space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-muted rounded-bl-md'
                    }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>

                  {/* Product Cards */}
                  {message.products && message.products.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.products.map(product => (
                        <div
                          key={product.id}
                          className="bg-background rounded-lg p-3 border border-border"
                        >
                          <Link
                            to={`/product/${product.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="font-medium text-sm hover:text-primary transition-colors"
                          >
                            {product.name}
                          </Link>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-bold text-secondary">{product.price}</span>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-7 text-xs"
                              onClick={() => handleQuickAdd(product.slug)}
                              disabled={!product.inStock}
                            >
                              <ShoppingCart className="w-3 h-3 mr-1" />
                              {product.inStock ? 'Add' : 'Out of Stock'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                  <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about mushrooms..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              size="icon"
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIChatWindow;
