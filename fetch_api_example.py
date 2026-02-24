
import requests

BASE = 'https://fakestoreapi.com'

def list_products():
    r = requests.get(f"{BASE}/products")
    r.raise_for_status()
    return r.json()

def product_detail(pid):
    r = requests.get(f"{BASE}/products/{pid}")
    r.raise_for_status()
    return r.json()

if __name__ == '__main__':
    items = list_products()
    print(f"Loaded {len(items)} products")
    if items:
        p = product_detail(items[0]['id'])
        print('Example product:')
        print('Title:', p['title'])
        print('Price:', p['price'])
        print('Category:', p['category'])
