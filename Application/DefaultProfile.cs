using Application.Dtos;
using AutoMapper;
using Entities;

namespace Application
{
    public class DefaultProfile : Profile
    {
        public DefaultProfile()
        {
            CreateMap<Todo, TodoDto>()
                   .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                   .ForMember(dest => dest.IsFinished, opt => opt.MapFrom(src => src.ErFerdig))
                   .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Dato))
                   .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Beskrivelse)).ReverseMap();
        }
    }
}
