import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-6 mt-12 border-t border-gray-800">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-semibold text-lg">Developed By cypherpulse.base.eth</span>
          <a
            href="https://github.com/John-Mukhwana"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.804 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            GitHub Profile
          </a>
        </div>
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <a
            href="https://github.com/John-Mukhwana/Foundry-FundMe-Reactjs-Typescript.git"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.804 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            Frontend GitHub
          </a>
          <a
            href="https://github.com/John-Mukhwana/solidity-foundry-fund-me.git"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 transition-colors font-medium flex items-center gap-2"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.804 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            Smart Contract GitHub
          </a>
          <a
            href="https://sepolia.etherscan.io/address/0xc077A97461A1053150193edFBfEDb07Be1677c00"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 transition-colors font-medium flex items-center gap-2"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.411 0-8-3.589-8-8 0-4.411 3.589-8 8-8 4.411 0 8 3.589 8 8 0 4.411-3.589 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
            SepoliaScan
          </a>
        </div>
      </div>
      <div className="w-full text-center mt-6">
        <span className="text-sm text-gray-400">
          This is an <span className="font-bold text-green-400">open source</span> project feel free to fork, twist, remix, meme, or break it (just don't blame us if you do)! 🚀😜
        </span>
      </div>
    </footer>
  );
};
export default Footer;
