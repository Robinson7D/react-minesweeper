import getDefaultControlValues from './get-default-control-values.jsx';

test('is a Function', function(){
  expect(typeof getDefaultControlValues).toBe('function');
});

test('returns different Objects for each call', function(){
  expect(getDefaultControlValues()).not.toBe(getDefaultControlValues());
});

test('sets size to 10', function(){
  expect(getDefaultControlValues().size).toBe(10);
});

test('sets difficulty to 1 (Easy)', function(){
  expect(getDefaultControlValues().difficulty).toBe(1);
});