// filter function
function filter(search,how){
    $("#list learn-card").filter(
        function(){
            let ContainResult = $(this).text().toLowerCase().indexOf(search)
            switch (how) {
                case 't':
                    $(this).toggle(ContainResult > -1)
                    break;
                case 'r':
                    $(this).remove(ContainResult > -1)
                    break;
                default:
                    break;
            }
        }
    )
}
// change the type of searching result 
function chTypeTitle(type){
    document.title = "LinuxHub | " + type
    $("#contentType").text(`${type}`)
    window.location = `/learn/${type}`
}
// filter results
$("document").ready(
    function(){
        $(".type").addClass("btn-light m-1 p-1 rounded") // Content selection bar
        console.log($("#contentType").text())
        if(document.title.includes("Learn") == false){
            filter($("#contentType").text(),'r')
        }
        // filter search
        $("#search").keyup(
            function() {
                let inputSearch = $(this).val().toLowerCase()
                filter(inputSearch,'t')
            }
        )
    }
)