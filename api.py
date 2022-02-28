from flask import Flask, send_file
from generateNFT import create_nft

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    create_nft()

    filename = 'nft.png'

    return send_file(filename, mimetype='image/png')

app.run(host='0.0.0.0', port='5000', debug=True)