/**
 * input type text, number, password 등에서 사용될 customhook
 * @author caias
 * @since 2020.10.07- draft
 * @example
 * import useInput from '_common/hooks/useInput';
 *
 * const [valueA, onChangeA] = useInput('');
 * const [valueB, onChangeB] = useInput('default string');
 *
 * <input onChange={onChangeA} value={valueA} type="text" className="input" placeholder="텍스트를 입력하세요." />
 * <input onChange={onChangeB} value={valueB} type="text" className="input" placeholder="텍스트를 입력하세요." />

 */

import { useState, useCallback } from 'react';

function useInput(initValue: string = '') {
  const [value, setValue] = useState<string>(initValue);

  const onChange = useCallback(e => setValue(e.target.value), [value]);
  const onReset = useCallback(() => {
    setValue(initValue);
  }, []);

  return [value, onChange, onReset];
}

export default useInput;
