let provider;
let signer;
let contract;

const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your contract address
const abi = [
    // Add the ABI of the contract here
    "function createPixel(uint256 x, uint256 y, string memory color) public",
    "function getPixel(uint256 pixelId) public view returns (uint256, uint256, string memory, address)",
    "function getUserPixels(address user) public view returns (uint256[] memory)"
];

// Connect to MetaMask
const connectButton = document.getElementById("connectButton");
const createPixelButton = document.getElementById("createPixelButton");

connectButton.addEventListener("click", async () => {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, abi, signer);
        connectButton.innerText = "Wallet Connected";
        createPixelButton.disabled = false;
    } else {
        alert("MetaMask is required!");
    }
});

// Create a new pixel
createPixelButton.addEventListener("click", async () => {
    const x = document.getElementById("xCoordinate").value;
    const y = document.getElementById("yCoordinate").value;
    const color = document.getElementById("color").value;

    if (!x || !y || !color) {
        alert("Please enter valid coordinates and color.");
        return;
    }

    const tx = await contract.createPixel(x, y, color);
    document.getElementById("status").innerText = "Creating pixel...";
    await tx.wait();
    document.getElementById("status").innerText = `Pixel created! Transaction Hash: ${tx.hash}`;
});
