# UK-s-Group-Finder

This project is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License. See the [LICENSE](LICENSE) file for details.

## Description
Uk's Group Finder is a Python script designed to help you find active and unowned Roblox groups using asynchronous requests and threading. It checks the status of groups on Roblox and reports hits to a specified webhook.

## Features
- Asynchronous group checking for faster performance
- Threading to maximize utilization of resources
- Webhook integration for reporting hits and errors

## Requirements
- Python 3.7+
- aiohttp library (`pip install aiohttp`)
- dhooks library (`pip install dhooks`)

## Usage
1. Clone this repository to your local machine.
2. Install the required libraries using pip:
   ```bash
   pip install aiohttp dhooks
3. Set up a webhook URL to receive hit and error notifications. You can use services like Discord's Webhooks or create a custom webhook receiver.
4. Open main.py in a text editor.
5. Replace "YOUR_WEBHOOK_URL_HERE" with your actual webhook URL.
6. Adjust the number of threads based on your system's capabilities and the desired performance.
7. Run the script: python main.py


## Configuration

    Replace "YOUR_WEBHOOK_URL_HERE" in the script with your actual webhook URL.
    Adjust the number of threads based on your system's capabilities and the desired performance.

## License

This project is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License. See the LICENSE file for details.
Disclaimer

This script is provided as-is without any warranties. Use it responsibly and comply with Roblox's terms of service and API usage guidelines.
Acknowledgments

    The script uses the aiohttp library for asynchronous HTTP requests.
    The dhooks library is used for webhook integration.

## Support

For any issues or questions, please open an issue on GitHub!
