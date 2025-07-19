import { useCallback } from "react";

export const useTruncateText = () => {
  const truncate = useCallback((text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  }, []);

  return { truncate };
};


//  Usage Example:

// const { truncate } = useTruncateText();

// const shortText = truncate("This is a very long text string", 10);

// it will truncate the text to 10 characters with "..."