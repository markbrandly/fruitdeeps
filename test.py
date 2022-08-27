from osrsbox import items_api

items = items_api.load()

for item in items: 
	if item.equipable:
		print(item.name)