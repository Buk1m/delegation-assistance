const columnsCentered = (shrink = true) => ({
  headerAlign: "center",
  align: "center",
  footerAlign: "center",
  headerStyle: shrink ? () => ({ minWidth: "100px", width: "10%" }) : null
});

export { columnsCentered };
