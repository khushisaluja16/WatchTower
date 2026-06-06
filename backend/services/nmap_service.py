#port scanning logic. Scans the port, 

import nmap


class NmapService:

    def scan_target(self, target):

        scanner = nmap.PortScanner()

        scanner.scan(
            target,
            arguments="-sV -F"
        )

        results = {
            "target": target,
            "hosts": []
        }

        for host in scanner.all_hosts():

            host_data = {
                "ip": host,
                "ports": []
            }

            for proto in scanner[host].all_protocols():

                ports = scanner[host][proto].keys()

                for port in ports:

                    service = scanner[host][proto][port]

                    host_data["ports"].append({
                        "port": port,
                        "state": service.get("state"),
                        "service": service.get("name"),
                        "product": service.get("product"),
                        "version": service.get("version")
                    })

            results["hosts"].append(host_data)

        return results