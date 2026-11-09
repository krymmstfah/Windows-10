import React, { useState } from 'react';
import { Delete, History } from 'lucide-react';
import { sounds } from '../../services/soundEffects';

export const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);
  const [memory, setMemory] = useState<number>(0);

  const handleNumber = (digit: string) => {
    sounds.playClick();
    if (display === '0' || shouldResetDisplay) {
      setDisplay(digit);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display + digit);
    }
  };

  const handleDecimal = () => {
    sounds.playClick();
    if (shouldResetDisplay) {
      setDisplay('0.');
      setShouldResetDisplay(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (op: string) => {
    sounds.playClick();
    const current = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(current);
      setEquation(`${current} ${op}`);
    } else if (operation) {
      const result = calculate(prevValue, current, operation);
      setPrevValue(result);
      setDisplay(String(result));
      setEquation(`${result} ${op}`);
    }

    setOperation(op);
    setShouldResetDisplay(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '−': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const handleEqual = () => {
    sounds.playClick();
    if (prevValue !== null && operation) {
      const current = parseFloat(display);
      const result = calculate(prevValue, current, operation);
      setEquation(`${prevValue} ${operation} ${current} =`);
      setDisplay(String(result));
      setPrevValue(null);
      setOperation(null);
      setShouldResetDisplay(true);
    }
  };

  const handleClear = () => {
    sounds.playClick();
    setDisplay('0');
    setEquation('');
    setPrevValue(null);
    setOperation(null);
  };

  const handleBackspace = () => {
    sounds.playClick();
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleSqrt = () => {
    sounds.playClick();
    const val = parseFloat(display);
    if (val >= 0) {
      const res = Math.sqrt(val);
      setDisplay(String(res));
      setEquation(`√(${val})`);
      setShouldResetDisplay(true);
    }
  };

  const handleSquare = () => {
    sounds.playClick();
    const val = parseFloat(display);
    const res = val * val;
    setDisplay(String(res));
    setEquation(`sqr(${val})`);
    setShouldResetDisplay(true);
  };

  const handleInverse = () => {
    sounds.playClick();
    const val = parseFloat(display);
    if (val !== 0) {
      const res = 1 / val;
      setDisplay(String(res));
      setEquation(`1/(${val})`);
      setShouldResetDisplay(true);
    }
  };

  const handleNegate = () => {
    sounds.playClick();
    const val = parseFloat(display);
    setDisplay(String(-val));
  };

  return (
    <div className="flex flex-col h-full bg-[#202020] text-white select-none p-3 justify-between">
      {/* Top Header / Mode */}
      <div className="flex items-center justify-between text-xs text-white/70 pb-1">
        <span className="font-semibold text-sm text-white">Standard</span>
        <button className="p-1 hover:bg-white/10 rounded" title="History">
          <History size={15} />
        </button>
      </div>

      {/* Screen Display */}
      <div className="text-right py-2 px-1">
        <div className="text-xs text-white/50 h-5 font-mono">{equation}</div>
        <div className="text-3xl sm:text-4xl font-light tracking-tight truncate font-mono">
          {display}
        </div>
      </div>

      {/* Memory Row */}
      <div className="grid grid-cols-5 gap-1 text-[11px] font-medium text-white/70 py-1">
        <button onClick={() => { setMemory(0); sounds.playClick(); }} className="py-1 hover:bg-white/10 rounded text-center">MC</button>
        <button onClick={() => { setDisplay(String(memory)); sounds.playClick(); }} className="py-1 hover:bg-white/10 rounded text-center">MR</button>
        <button onClick={() => { setMemory(memory + parseFloat(display)); sounds.playClick(); }} className="py-1 hover:bg-white/10 rounded text-center">M+</button>
        <button onClick={() => { setMemory(memory - parseFloat(display)); sounds.playClick(); }} className="py-1 hover:bg-white/10 rounded text-center">M-</button>
        <button onClick={() => { setMemory(parseFloat(display)); sounds.playClick(); }} className="py-1 hover:bg-white/10 rounded text-center">MS</button>
      </div>

      {/* Keypad Grid */}
      <div className="grid grid-cols-4 gap-1.5 flex-1 pt-2">
        <button onClick={() => setDisplay(String(parseFloat(display) / 100))} className="btn-calc-fn">%</button>
        <button onClick={() => setDisplay('0')} className="btn-calc-fn">CE</button>
        <button onClick={handleClear} className="btn-calc-fn">C</button>
        <button onClick={handleBackspace} className="btn-calc-fn flex items-center justify-center"><Delete size={16} /></button>

        <button onClick={handleInverse} className="btn-calc-fn">¹/x</button>
        <button onClick={handleSquare} className="btn-calc-fn">x²</button>
        <button onClick={handleSqrt} className="btn-calc-fn">√x</button>
        <button onClick={() => handleOperator('÷')} className="btn-calc-op">÷</button>

        <button onClick={() => handleNumber('7')} className="btn-calc-num">7</button>
        <button onClick={() => handleNumber('8')} className="btn-calc-num">8</button>
        <button onClick={() => handleNumber('9')} className="btn-calc-num">9</button>
        <button onClick={() => handleOperator('×')} className="btn-calc-op">×</button>

        <button onClick={() => handleNumber('4')} className="btn-calc-num">4</button>
        <button onClick={() => handleNumber('5')} className="btn-calc-num">5</button>
        <button onClick={() => handleNumber('6')} className="btn-calc-num">6</button>
        <button onClick={() => handleOperator('−')} className="btn-calc-op">−</button>

        <button onClick={() => handleNumber('1')} className="btn-calc-num">1</button>
        <button onClick={() => handleNumber('2')} className="btn-calc-num">2</button>
        <button onClick={() => handleNumber('3')} className="btn-calc-num">3</button>
        <button onClick={() => handleOperator('+')} className="btn-calc-op">+</button>

        <button onClick={handleNegate} className="btn-calc-num">±</button>
        <button onClick={() => handleNumber('0')} className="btn-calc-num">0</button>
        <button onClick={handleDecimal} className="btn-calc-num">.</button>
        <button onClick={handleEqual} className="btn-calc-equal">=</button>
      </div>

      <style>{`
        .btn-calc-num {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          font-size: 15px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.1s;
        }
        .btn-calc-num:hover {
          background: rgba(255, 255, 255, 0.16);
        }
        .btn-calc-num:active {
          background: rgba(255, 255, 255, 0.24);
        }
        .btn-calc-fn, .btn-calc-op {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.1s;
          color: rgba(255, 255, 255, 0.9);
        }
        .btn-calc-fn:hover, .btn-calc-op:hover {
          background: rgba(255, 255, 255, 0.12);
        }
        .btn-calc-equal {
          background: var(--accent, #0078d7);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          transition: filter 0.1s;
        }
        .btn-calc-equal:hover {
          filter: brightness(1.15);
        }
      `}</style>
    </div>
  );
};
