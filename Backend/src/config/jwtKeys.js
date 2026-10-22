const loadPemKey = (name) => {
  const value = process.env[name];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${name} must be set in the environment.`);
  }

  return value.replace(/\\n/g, "\n").replace(/\r\n/g, "\n");
};

module.exports = {
  privateKey: loadPemKey("PRIVATE_KEY"),
  publicKey: loadPemKey("PUBLIC_KEY"),
};
