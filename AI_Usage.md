# AI usage log

## Week 1
- Tool(s): NONE
- What I asked for:
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it:

## Week 2
- Tool(s): ChatGPT Codex
- What I asked for: Why is my screen white?
- What I kept, changed or rejected, and why: I was missing `export default MenuItemCard` at the bottom of MenuItemCard.jsx
- One thing the AI got wrong and how I fixed it:

## Week 3

### Formatting and blank-page debugging
- Tool(s): ChatGPT Codex
- What I asked for: Help placing the vendor/menu content in App.jsx, fixing indentation, and finding the cause of the blank page.
- What I kept, changed or rejected, and why: Used the formatting changes and guidance on imports, undefined variables, and moving the shared return outside the menu branch. Removed the nested main and duplicate footer after the review.
- One thing the AI got wrong and how I fixed it: The AI initially suggested removing the loading/error branches because the data was imported directly. After comparing with the lab sheet, I kept the branches and added the required fetch logic.

### Inline code completion
- Tool(s): GitHub Copilot
- What I asked for: General inline code completion while writing the lab code.
- What I kept, changed or rejected, and why: Used inline suggestions while editing. I did not record individual suggestions or rejections.
- One thing the AI got wrong and how I fixed it: No specific Copilot mistake was recorded.

### Vendor JSON data
- Tool(s): ChatGPT Codex
- What I asked for: Add the menu items and prices I supplied, choose categories for the additional dishes, format the three vendors as JSON, and mark most of my items as available.
- What I kept, changed or rejected, and why: Kept the added items, Porridge/Sides/Sizzling categories, and availability fields. The AI edited vendors.json directly, wrapped the vendors in an array, and checked JSON validity. Ten of my twelve items were marked available.
- One thing the AI got wrong and how I fixed it: The AI initially assumed the sample matric number and suggested the spice-filter feature. After checking my vendor ID, it corrected the required feature to favourites for matric number 2410063.

### B2: Fetching vendors
- Tool(s): ChatGPT Codex
- What I asked for: Guidance on fetching vendors.json using useEffect, including loading, error, retry, cleanup, and selecting the first vendor.
- What I kept, changed or rejected, and why: Used the suggested state and fetch structure, response.ok check, AbortController cleanup, and reloadKey dependency. The AI supplied code examples that I added to App.jsx.
- One thing the AI got wrong and how I fixed it: The earlier advice to remove the loading/error branches did not meet B2. I followed the later guidance based on the PDF instead.

### B3-B4: Cart review
- Tool(s): ChatGPT Codex
- What I asked for: Review handleChangeQty, handleRemove, and the B3 requirements, and explain why the cart data needed to change.
- What I kept, changed or rejected, and why: Kept the quantity/removal handlers and used the suggested add-to-cart structure with { item, qty }, merging repeated additions. Connected the plus/remove buttons and calculated totals and the badge from cart quantities.
- One thing the AI got wrong and how I fixed it: No specific error was identified in this cart guidance. The review identified that my original add handler stored raw items instead of cart lines.

### B5: Checkout validation and confirmation
- Tool(s): ChatGPT Codex
- What I asked for: Step-by-step instructions and code examples for B5 without direct file edits, then help when validation messages did not appear.
- What I kept, changed or rejected, and why: Used the suggested mahallah and pickup-time validation, controlled time input, per-field errors, valid-submit callback, lastOrder state, and confirmation showing pickup time and total. The order handler saves the total before clearing the cart.
- One thing the AI got wrong and how I fixed it: No specific error was identified in the supplied B5 logic. When my edited validate function failed, the AI identified that I had omitted the local errors object, name validation, and return errors; I restored them.

### B6: Favourite items
- Tool(s): ChatGPT Codex
- What I asked for: Explain feature 3 and help diagnose why the favourite button did not work.
- What I kept, changed or rejected, and why: Used the supplied examples to keep favourite item IDs in App, toggle IDs without mutation, derive the visible menu, and pass isFavourite and onToggleFavourite through MenuList to MenuItemCard.
- One thing the AI got wrong and how I fixed it: The earlier feature recommendation used the wrong matric number; the corrected feature was favourites. During implementation, the AI helped me fix my singular/plural setter mismatch, move handleToggleFavourite outside handlePlaceOrder, and pass the missing card props.

### Final review and AI log
- Tool(s): ChatGPT Codex
- What I asked for: Compare my work with the lab PDF, check GitHub submission status, tidy App.jsx formatting, and fill in this AI usage log from the conversation.
- What I kept, changed or rejected, and why: Used the remaining-work checklist. The AI checked pushed commits and the week-3 tag, ran build/lint checks, and directly formatted App.jsx. It also drafted this Week 3 log from our conversation.
- One thing the AI got wrong and how I fixed it: Passing build/lint did not prove every browser interaction worked; manual checks of retry, cart updates, validation, confirmation, and favourites are still needed.
