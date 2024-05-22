import tkinter as tk
from tkinter import ttk, messagebox
import asyncio
import aiohttp
import random
import threading
import time
import webbrowser

# Set up the webhook
hook_url = "YOUR_WEBHOOK_URL_HERE"

class GroupFinderApp:
    def __init__(self, root):
        self.root = root
        self.root.title("UK's Group Finder")
        self.auto_search_thread = None
        self.start_time = None
        self.create_widgets()

    def create_widgets(self):
        self.auto_search_button = ttk.Button(self.root, text="Auto Search", command=self.start_auto_search)
        self.result_label = ttk.Label(self.root, text="Search Results:")
        self.result_listbox = tk.Listbox(self.root, width=50, height=10)
        self.result_scrollbar = ttk.Scrollbar(self.root, orient="vertical", command=self.result_listbox.yview)
        self.result_listbox.config(yscrollcommand=self.result_scrollbar.set)

        self.auto_search_button.grid(row=0, column=0, padx=10, pady=10)
        self.result_label.grid(row=1, column=0, padx=10, pady=10, sticky="w")
        self.result_listbox.grid(row=2, column=0, padx=10, pady=10, sticky="we")
        self.result_scrollbar.grid(row=2, column=1, sticky="ns")

        # Support Page Button
        self.support_button = ttk.Button(self.root, text="Support Page", command=self.open_support_page)
        self.support_button.grid(row=3, column=0, padx=10, pady=10)

    def start_auto_search(self):
        self.auto_search_button.config(state="disabled")
        self.start_time = time.time()
        self.auto_search_thread = threading.Thread(target=self.auto_search_groups)
        self.auto_search_thread.start()

    def auto_search_groups(self):
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(self.async_auto_search_groups())

    async def async_auto_search_groups(self):
        async with aiohttp.ClientSession() as session:
            try:
                while True:
                    id = random.randint(1000000, 1150000)
                    await self.search_group(session, id)
                    await asyncio.sleep(1.5)  # Add a cooldown of 1.5 seconds
            except Exception as e:
                messagebox.showerror("Error", f"An error occurred: {e}")

    async def search_group(self, session, id):
        async with session.get(f"https://www.roblox.com/groups/group.aspx?gid={id}", timeout=5) as r:
            text = await r.text()
            if 'owned' not in text:
                self.handle_search_result(id, text)

    def handle_search_result(self, id, text):
        members_count = text.count('Members')
        group_closed = 'This group is unavailable' in text
        if members_count > 0:
            members_info = f"Members: {members_count}"
            closed_info = " (Closed Group)" if group_closed else ""
            result_info = f"Group ID: {id} {members_info}{closed_info}"
            self.result_listbox.insert(tk.END, result_info)
        else:
            print(f"Group Already Owned: {id}")

    def open_support_page(self):
        webbrowser.open("https://www.your-support-page.com")

    def update_timer(self):
        if self.start_time:
            elapsed_time = time.time() - self.start_time
            elapsed_str = time.strftime("%H:%M:%S", time.gmtime(elapsed_time))
            self.root.title(f"UK's Group Finder - Elapsed Time: {elapsed_str}")
        self.root.after(1000, self.update_timer)

# Create and run the GUI
root = tk.Tk()
app = GroupFinderApp(root)
app.update_timer()
root.mainloop()
