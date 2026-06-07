class SeverityAggregator:
    
    def aggregate(
        self,
        web_checks,
        vulnerabilities,
        ssl_analysis
    ):
        summary = {
            "critical": 0,
            "high": 0,
            "medium": 0,
            "low": 0,
            "info": 0
        }
        
        #web checks 
        
        for finding in web_checks:
            
            severity = finding.get(
                "severity",
                "Info"
            ).lower()
            
            if severity in summary:
                summary[severity] +=1 
        
        #Vulnerabilities 
        
        for vulnerability in vulnerabilities:
            
            severity = vulnerability.get(
                "severity",
                "Low"
            ).lower()
            
            if severity in summary: 
            
                summary[severity] +=1
        
        
        #SSL Warnings
        
        warnings = ssl_analysis.get(
            "warnings",
            []
        )
        
        summary["medium"] += len(warnings)
        
        return summary