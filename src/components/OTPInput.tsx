import type { ClipboardEvent, KeyboardEvent, ChangeEvent } from 'react';
import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
}

function OTPInput({ length = 6, value, onChange, autoFocus = true }: OTPInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length }, (_, index) => value[index] ?? '');

  useEffect(() => {
    if (autoFocus) {
      inputRefs.current[0]?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setDigit = (index: number, digit: string) => {
    const nextDigits = [...digits];
    nextDigits[index] = digit;
    onChange(nextDigits.join(''));
  };

  const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value.replace(/\D/g, '');
    if (!raw) {
      setDigit(index, '');
      return;
    }
    const digit = raw.slice(-1);
    setDigit(index, digit);
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      if (digits[index]) {
        setDigit(index, '');
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        setDigit(index - 1, '');
      }
      event.preventDefault();
    } else if (event.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pasted) return;
    onChange(pasted.padEnd(length, '').slice(0, length).trimEnd());
    const focusIndex = Math.min(pasted.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <Box sx={{ display: 'flex', gap: 1.25, justifyContent: 'center' }}>
      {digits.map((digit, index) => (
        <OutlinedInput
          key={index}
          inputRef={(el: HTMLInputElement | null) => {
            inputRefs.current[index] = el;
          }}
          value={digit}
          onChange={handleChange(index)}
          onKeyDown={handleKeyDown(index)}
          onPaste={handlePaste}
          inputMode="numeric"
          slotProps={{
            input: {
              maxLength: 1,
              inputMode: 'numeric',
              pattern: '[0-9]*',
              style: { textAlign: 'center', fontSize: '1.35rem', fontWeight: 700, padding: '10px 0' },
            },
          }}
          sx={{ width: 48, height: 56, borderRadius: 2.5 }}
        />
      ))}
    </Box>
  );
}

export default OTPInput;
