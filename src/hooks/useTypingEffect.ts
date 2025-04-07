import { useState, useEffect, useRef } from 'react';

interface UseTypingEffectOptions {
  text: string;
  typingSpeed?: number;
  delayBeforeStart?: number;
  showCursor?: boolean;
}

interface UseTypingEffectReturn {
  displayText: string;
  isTyping: boolean;
  isDone: boolean;
  cursorVisible: boolean;
}

/**
 * A custom hook that creates a typing animation effect
 * 
 * @param options.text - The text to be typed
 * @param options.typingSpeed - The speed of typing in milliseconds (default: 50ms)
 * @param options.delayBeforeStart - Delay before typing starts in milliseconds (default: 300ms)
 * @param options.showCursor - Whether to show a blinking cursor (default: true)
 * 
 * @returns Object containing displayText, isTyping, isDone, and cursorVisible
 */
export function useTypingEffect({
  text,
  typingSpeed = 50,
  delayBeforeStart = 300,
  showCursor = true,
}: UseTypingEffectOptions): UseTypingEffectReturn {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(showCursor);
  
  const indexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle typing animation
  useEffect(() => {
    // Clear any existing timeouts
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    // Reset state when text changes
    setDisplayText('');
    setIsTyping(false);
    setIsDone(false);
    indexRef.current = 0;
    
    // Delay before starting to type
    timeoutRef.current = setTimeout(() => {
      setIsTyping(true);
      
      // Start typing animation
      const typeNextChar = () => {
        if (indexRef.current < text.length) {
          setDisplayText(text.substring(0, indexRef.current + 1));
          indexRef.current += 1;
          timeoutRef.current = setTimeout(typeNextChar, typingSpeed);
        } else {
          setIsTyping(false);
          setIsDone(true);
        }
      };
      
      typeNextChar();
    }, delayBeforeStart);
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, typingSpeed, delayBeforeStart]);
  
  // Handle cursor blinking
  useEffect(() => {
    if (!showCursor) return;
    
    // Start cursor blinking after typing is done
    if (isDone) {
      cursorIntervalRef.current = setInterval(() => {
        setCursorVisible(prev => !prev);
      }, 500); // Blink every 500ms
    } else if (isTyping) {
      // Keep cursor visible during typing
      setCursorVisible(true);
    }
    
    return () => {
      if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
    };
  }, [isDone, isTyping, showCursor]);
  
  return { displayText, isTyping, isDone, cursorVisible };
}
