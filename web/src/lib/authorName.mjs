const CJK = /[⺀-鿿가-힯豈-﫿]/;

// OAI Dublin Core gives "Surname, Given". Display names with the given name
// first ("Given Surname"); CJK names keep surname-first order with no space.
// Names without exactly one comma are returned untouched.
export function normalizeAuthorName(name) {
  const value = String(name || '').trim();
  const parts = value.split(',');
  if (parts.length !== 2) return value;
  const [surname, given] = parts.map((part) => part.trim());
  if (!surname || !given) return value;
  return CJK.test(value) ? surname + given : given + ' ' + surname;
}
